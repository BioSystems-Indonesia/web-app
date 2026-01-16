import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { WithAuth } from "@/lib/http/WithAuth";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { ProductRequest, VariantRequest } from "@/domain/dto/Product";

// CSV helper types
type RawRecord = Record<string, string | undefined>;
type NormalizedRecord = Record<string, string>;

interface NormalizedVariantRow {
  idReagent?: string;
  instrument?: string;
  code?: string;
  raVol?: string;
  rbVol?: string;
  kitVol?: string;
}

interface NormalizedReagentRow {
  id: string;
  name: string;
  method: string;
  type: string;
  categoriesRaw: string;
  variants: NormalizedVariantRow[];
}

export const POST = WithAuth(async (req: NextRequest, _ctx: unknown) => {
  const formData = await req.formData();

  const reagentFile = (formData.get("reagent") as File) ?? (formData.get("reagent.csv") as File);
  const variantFile = (formData.get("variant") as File) ?? (formData.get("variant.csv") as File);

  if (!reagentFile || !variantFile) {
    return NextResponse.json(
      APIResponseBuilder.badRequest("Both reagent.csv and variant.csv files are required"),
      { status: HttpStatus.BAD_REQUEST }
    );
  }

  const reagentCsv = Buffer.from(await reagentFile.arrayBuffer()).toString("utf-8");
  const variantCsv = Buffer.from(await variantFile.arrayBuffer()).toString("utf-8");

  const reagents = parse(reagentCsv, { columns: true, skip_empty_lines: true }) as RawRecord[];
  const variants = parse(variantCsv, { columns: true, skip_empty_lines: true }) as RawRecord[];

  const normalizeRecord = (rec: RawRecord): NormalizedRecord => {
    const out: NormalizedRecord = {};
    for (const key of Object.keys(rec)) {
      const val = rec[key];
      out[key.trim().toLowerCase()] = typeof val === "string" ? val : String(val ?? "");
    }
    return out;
  };

  const reagentsNorm = reagents.map(normalizeRecord);
  const variantsNorm = variants.map(normalizeRecord);

  const reagentMap = new Map<string, NormalizedReagentRow>();
  for (const r of reagentsNorm) {
    const id = (r.id || "").trim();
    if (!id) continue;
    reagentMap.set(id, {
      id,
      name: (r.name || "").trim(),
      method: (r.method || "").trim(),
      type: (r.type || "").trim(),
      categoriesRaw: (r.categories || r.category || "").trim(),
      variants: [],
    });
  }

  for (const v of variantsNorm) {
    const idReagent = (v.idreagent || v["id_reagent"] || v["id reagent"] || "").trim();
    if (!idReagent) continue;
    const item = reagentMap.get(idReagent);
    if (!item) continue;
    item.variants.push({
      idReagent: idReagent,
      instrument: (v.instrument || "").trim(),
      code: (v.code || "").trim(),
      raVol: (v.ravol || v["raVol"] || v["ra_vol"] || "").trim(),
      rbVol: (v.rbvol || v["rbVol"] || v["rb_vol"] || "").trim(),
      kitVol: (v.kitvol || v["kitVol"] || v["kit_vol"] || "").trim(),
    });
  }

  // Debugging: if no reagents found, log parsed headers for diagnosis
  if (reagentMap.size === 0) {
    console.log("Parsed reagents sample:", reagents.slice(0, 3));
    console.log("Parsed reagent normalized sample:", reagentsNorm.slice(0, 3));
    console.log("Parsed variants sample:", variants.slice(0, 3));
    console.log("Parsed variant normalized sample:", variantsNorm.slice(0, 3));
  }
  const productRepo = new (
    await import("@/infrastructure/product/ProductRepository")
  ).ProductRepositoryPrisma();

  const created: { productId: number; name: string }[] = [];
  const errors: { id: string; error: string }[] = [];
  let variantsCreated = 0;

  for (const [, r] of reagentMap) {
    const categories = (r.categoriesRaw || "")
      .split(/[;,|]+/)
      .map((s: string) => s.trim())
      .filter(Boolean);

    const productReq: ProductRequest = {
      name: r.name,
      method: r.method,
      productType: r.type || "CLINICAL",
      category: categories,
      variant: (r.variants || []).map((vv) => ({
        code: (vv.code || "").trim(),
        instrument: (vv.instrument || "").trim(),
        raVolume: (vv.raVol || "").trim(),
        rbVolume: (vv.rbVol || "").trim(),
        kitVolume: (vv.kitVol || "").trim(),
      })) as VariantRequest[],
    };

    try {
      const prod = await productRepo.create(productReq);
      created.push({ productId: prod.id, name: prod.name });
      variantsCreated += (productReq.variant || []).length;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push({ id: r.id, error: msg });
    }
  }

  return NextResponse.json({
    message: "CSV import finished",
    productsCreated: created.length,
    variantsCreated,
    created,
    errors,
  });
});
