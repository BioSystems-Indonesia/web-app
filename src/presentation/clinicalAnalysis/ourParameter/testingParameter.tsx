"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import "./testingParameter.css";
import PanelIcon from "@/presentation/components/icon/panel.svg";
import AnemiaIcon from "@/presentation/components/icon/anemia.svg";
import CardicIcon from "@/presentation/components/icon/cardiac.svg";
import DiabeticIcon from "@/presentation/components/icon/diabetic.svg";
import FertilityIcon from "@/presentation/components/icon/fertility.svg";
import GastricIcon from "@/presentation/components/icon/gastric.svg";
import HemostasisIcon from "@/presentation/components/icon/hemostasis.svg";
import immuneIcon from "@/presentation/components/icon/immune.svg";
import infectiousIcon from "@/presentation/components/icon/infectius.svg";
import InflammatoryIcon from "@/presentation/components/icon/inflamatory.svg";
import IonsIcon from "@/presentation/components/icon/ions.svg";
import LipidIcon from "@/presentation/components/icon/lipid.svg";
import LiverIcon from "@/presentation/components/icon/liver.svg";
import PancreaticIcon from "@/presentation/components/icon/pancreatic.svg";
import RenalIcon from "@/presentation/components/icon/renal.svg";
import { ComponentType, SVGProps } from "react";

interface AssayItem {
  analyzer: string;
  code: string;
  RA: string;
  RB: string;
  mLPerKit: string;
}

interface ProductCategory {
  id: string;
  category: string;
  productType: string;
}

interface ProductVariant {
  instrument: string;
  code: string;
  raVolume: string;
  rbVolume: string;
  kitVolume: string;
}

interface Product {
  name: string;
  method: string;
  variants?: ProductVariant[];
}

interface ChemistryPanel {
  name: string;
  method: string;
  unit: string;
  items: AssayItem[];
}

interface TestingPanel {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

type Props = {
  color: string;
  productType: "CLINICAL" | "FOOD_AND_BEVERAGE";
};

export default function TestingParameterSection({ color, productType }: Props) {
  const t = useTranslations("ClinicalAnalysis");
  const [panelActive, setIsactive] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRes = await axios.get("/api/product-category");
        const allCategories = categoriesRes.data.data || [];
        const filtered = allCategories.filter(
          (cat: ProductCategory) => cat.productType === productType
        );
        setCategories(filtered);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [productType]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (categories.length === 0) return;

      const activeCategory = categories[panelActive];
      if (!activeCategory) return;

      try {
        const endpoint =
          productType === "CLINICAL"
            ? `/api/product/clinical/${activeCategory.id}`
            : `/api/product/food-and-beverage/${activeCategory.id}`;

        const productsRes = await axios.get(endpoint);
        setProducts(productsRes.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [panelActive, categories, productType]);

  const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    Anemia: AnemiaIcon,
    Cardiac: CardicIcon,
    Diabetic: DiabeticIcon,
    Fertility: FertilityIcon,
    Gastric: GastricIcon,
    Hemostasis: HemostasisIcon,
    Immune: immuneIcon,
    Infectious: infectiousIcon,
    Inflammatory: InflammatoryIcon,
    Ions: IonsIcon,
    Lipid: LipidIcon,
    Liver: LiverIcon,
    Pancreatic: PancreaticIcon,
    Renal: RenalIcon,
  };

  const testingPanel: TestingPanel[] = categories.map((cat) => ({
    title: cat.category,
    icon: iconMap[cat.category] || AnemiaIcon,
  }));

  const toggleCard = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Map products to chemistry panels
  const activeChemistryPanels: ChemistryPanel[] = products.map((product) => ({
    name: product.name,
    method: product.method,
    unit: "mL/Kit",
    items:
      product.variants?.map((v: ProductVariant) => ({
        analyzer: v.instrument,
        code: v.code,
        RA: v.raVolume,
        RB: v.rbVolume,
        mLPerKit: v.kitVolume,
      })) || [],
  }));

  const activePanel = testingPanel[panelActive] || testingPanel[0];

  const filterClick = (index: number) => {
    setIsactive(index);
  };

  if (loading) {
    return (
      <section
        className="testing-parameter"
        style={{ "--hover-color": color } as React.CSSProperties & { "--hover-color": string }}
      >
        <div className="head">
          <h1>{t("testingParametersTitle")}</h1>
        </div>
        <div className="content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>{t("loading")}</p>
        </div>
      </section>
    );
  }

  if (!activePanel || testingPanel.length === 0) {
    return (
      <section
        className="testing-parameter"
        style={{ "--hover-color": color } as React.CSSProperties & { "--hover-color": string }}
      >
        <div className="head">
          <h1>{t("testingParametersTitle")}</h1>
        </div>
        <div className="content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>{t("noPanelsAvailable")}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="testing-parameter"
      style={{ "--hover-color": color } as React.CSSProperties & { "--hover-color": string }}
    >
      <div className="head">
        <h1>{t("testingParametersTitle")}</h1>
      </div>
      <div className="content">
        <div className="panel">
          <div className="chip">
            <PanelIcon />
            <h3>PANEL</h3>
          </div>
          <ul className="category-list">
            {testingPanel.map((testing, index) => (
              <li
                key={index}
                className={index === panelActive ? "isActive" : ""}
                onClick={() => filterClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") filterClick(index);
                }}
              >
                {testing.title.toUpperCase()}
              </li>
            ))}
          </ul>
          <div className="parameter">
            <div className="category">
              {activePanel.icon && <activePanel.icon className="panel-icon" />}
              <h4>{activePanel.title}</h4>
            </div>
            <ul className="parameter-list">
              {activeChemistryPanels.map((chemistry, index) => (
                <li
                  onClick={() => toggleCard(index)}
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: expandedIndex === index ? "rgba(106, 106, 106, 0.05)" : "",
                    cursor: "pointer",
                  }}
                >
                  <div className="title">
                    <p className={"title-text " + (expandedIndex === index ? "hidden" : "visible")}>
                      {chemistry.name.toUpperCase()}
                    </p>
                    <p className={"plus " + (expandedIndex === index ? "" : "rotated")}>+</p>
                  </div>
                  <div className={"card " + (expandedIndex === index ? "open" : "")}>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: "10rem" }}>
                            {/* <span className={"th-text " + (expandedIndex === index ? "visible" : "hidden")}>{chemistry.name}</span> */}
                          </th>
                          <th style={{ width: "10rem", textAlign: "start" }}>{t("code")}</th>
                          <th style={{ width: "10rem", textAlign: "start" }}>RA</th>
                          <th style={{ width: "10rem", textAlign: "start" }}>RB</th>
                          <th style={{ width: "10rem", textAlign: "start" }}>{chemistry.unit}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan={5}
                            className="method-cell"
                            style={{ paddingLeft: "10px", paddingBottom: "2rem" }}
                          >
                            <div style={{ display: "inline-block", width: "82px" }}>
                              <p>{chemistry.method.toUpperCase()}</p>
                            </div>
                          </td>
                        </tr>
                        {chemistry.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="analyzer-cell" style={{ textAlign: "start" }}>
                              <p className="analyzer">{item.analyzer.toUpperCase()}</p>
                            </td>
                            <td>{item.code}</td>
                            <td>
                              {!(
                                item.RA.includes("tube") ||
                                item.RA.includes("g") ||
                                item.RA.includes("-")
                              )
                                ? item.RA + " mL"
                                : item.RA}
                            </td>
                            <td>
                              {!(
                                item.RB.includes("tube") ||
                                item.RB.includes("g") ||
                                item.RB.includes("-")
                              )
                                ? item.RB + " mL"
                                : item.RB}
                            </td>
                            <td>
                              {!(item.mLPerKit.includes("tube") || item.mLPerKit.includes("g"))
                                ? item.mLPerKit + " mL"
                                : item.mLPerKit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <p className="more-details" style={{ paddingLeft: "10px", marginTop: "30px" }}>{t('moreDetails')}</p> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
