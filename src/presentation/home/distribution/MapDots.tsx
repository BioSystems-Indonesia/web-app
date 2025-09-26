import Image from "next/image";
import Map from "@/assets/img/home/map.png";

import Lineaceh from "@/assets/img/line/line-aceh.svg";
import Linebatam from "@/assets/img/line/line-batam.svg";
import Linebengkulu from "@/assets/img/line/line-bengkulu.svg";
import Linejambi from "@/assets/img/line/line-jambi.svg";
import Linelampung from "@/assets/img/line/line-lampung.svg";
import LineMedan from "@/assets/img/line/line-medan.svg";
import Linepadang from "@/assets/img/line/line-padang.svg";
import Linepalembang from "@/assets/img/line/line-palembang.svg";
import LinepangkalPinang from "@/assets/img/line/line-pangkal-pinang.svg";
import Linepekanbaru from "@/assets/img/line/line-pekanbaru.svg";
import Lineambon from "@/assets/img/line/line-ambon.svg";
import Linebali from "@/assets/img/line/line-bali.svg";
import Linebalikpapan from "@/assets/img/line/line-balikpapan.svg";
import Linebandung from "@/assets/img/line/line-bandung.svg";
import Linebanjarmasin from "@/assets/img/line/line-banjarmasin.svg";
import Linebogor from "@/assets/img/line/line-bogor.svg";
import Linecirebon from "@/assets/img/line/line-cirebon.svg";
import Linegorontalo from "@/assets/img/line/line-gorontalo.svg";
import Linejakarta from "@/assets/img/line/line-jakarta.svg";
import Linejayapura from "@/assets/img/line/line-jayapura.svg";
import Linekediri from "@/assets/img/line/line-kediri.svg";
import Linekendari from "@/assets/img/line/line-kendari.svg";
import Linekupang from "@/assets/img/line/line-kupang.svg";
import Linemakassar from "@/assets/img/line/line-makassar.svg";
import Linemalang from "@/assets/img/line/line-malang.svg";
import Linemamuju from "@/assets/img/line/line-mamuju.svg";
import Linemanado from "@/assets/img/line/line-manado.svg";
import Linemataram from "@/assets/img/line/line-mataram.svg";
import Linepalangkaraya from "@/assets/img/line/line-palangkaraya.svg";
import Linepalu from "@/assets/img/line/line-palu.svg";
import Linepontianak from "@/assets/img/line/line-pontianak.svg";
import Linerangkas from "@/assets/img/line/line-rangkas.svg";
import Linesemarang from "@/assets/img/line/line-semarang.svg";
import Lineserang from "@/assets/img/line/line-serang.svg";
import Linesubang from "@/assets/img/line/line-subang.svg";
import Linesurabaya from "@/assets/img/line/line-surabaya.svg";
import Linetarakan from "@/assets/img/line/line-tarakan.svg";
import Lineyogya from "@/assets/img/line/line-yogya.svg";


const dots = [
    // Sumatera
    { id: "aceh", name: "Aceh", top: "1rem", left: "1.5rem", Comp: Lineaceh, anchor: "bottom-left" },
    { id: "medan", name: "Medan", top: "6rem", left: "8.5rem", Comp: LineMedan, anchor: "bottom-left" },
    { id: "pekanbaru", name: "Pekanbaru", top: "11rem", left: "13.4rem", Comp: Linepekanbaru, anchor: "bottom-left" },
    { id: "padang", name: "Padang", top: "15rem", left: "13.5rem", Comp: Linepadang, anchor: "top-right" },
    { id: "batam", name: "Batam", top: "10.5rem", left: "20.2rem", Comp: Linebatam, anchor: "bottom-left" },
    { id: "bengkulu", name: "Bengkulu", top: "20.5rem", left: "17rem", Comp: Linebengkulu, anchor: "top-right" },
    { id: "jambi", name: "Jambi", top: "15.5rem", left: "19rem", Comp: Linejambi, anchor: "bottom-left" },
    { id: "jambi-2", name: "Jambi", top: "16.4rem", left: "19.3rem", Comp: "", anchor: "bottom-left" },
    { id: "palembang", name: "Palembang", top: "18.5rem", left: "22rem", Comp: "", anchor: "bottom-left" },
    { id: "palembang-2", name: "Palembang", top: "19rem", left: "22.5rem", Comp: Linepalembang, anchor: "bottom-left" },
    { id: "palembang-3", name: "Palembang", top: "19.5rem", left: "23rem", Comp: "", anchor: "bottom-left" },
    { id: "lampung", name: "Lampung", top: "24rem", left: "23rem", Comp: Linelampung, anchor: "top-right" },
    { id: "pangkalpinang", name: "Pangkalpinang", top: "18rem", left: "25.5rem", Comp: LinepangkalPinang, anchor: "bottom-left" },
    
    // Jawa
    { id: "serang", name: "Serang", top: "26rem", left: "24.9rem", Comp: Lineserang, anchor: "bottom-left" },
    { id: "rangkasbitung", name: "Rangkasbitung", top: "27.2rem", left: "25.5rem", Comp: Linerangkas, anchor: "top-right" },
    { id: "jakarta", name: "Jakarta", top: "26rem", left: "26.8rem", Comp: Linejakarta, anchor: "bottom-left" },
    { id: "jakarta-2", name: "Jakarta", top: "26.3rem", left: "27.3rem", Comp: "", anchor: "bottom-left" },
    { id: "subang", name: "Subang", top: "27rem", left: "28.3rem", Comp: Linesubang, anchor: "bottom-left" },
    { id: "bogor", name: "Bogor", top: "27.7rem", left: "27.5rem", Comp: Linebogor, anchor: "top-right" },
    { id: "cirebon", name: "Cirebon", top: "27rem", left: "30.3rem", Comp: Linecirebon, anchor: "bottom-left" },
    { id: "bandung", name: "Bandung", top: "28.5rem", left: "29rem", Comp: Linebandung, anchor: "top-right" },
    { id: "semarang", name: "Semarang", top: "27.88rem", left: "35rem", Comp: Linesemarang, anchor: "bottom-left" },
    { id: "yogya", name: "DI Yogyakarta", top: "29.8rem", left: "35rem", Comp: Lineyogya, anchor: "top-right" },
    { id: "surabaya", name: "Surabaya", top: "28.5rem", left: "39rem", Comp: Linesurabaya, anchor: "bottom-left" },
    { id: "surabaya-2", name: "Surabaya", top: "28.5rem", left: "39.6rem", Comp: "", anchor: "bottom-left" },
    { id: "malang", name: "Malang", top: "30rem", left: "39.8rem", Comp: Linemalang, anchor: "top-right" },
    { id: "kediri", name: "Kediri", top: "29.7rem", left: "37.6rem", Comp: Linekediri, anchor: "top-right" },
    { id: "bali", name: "Bali", top: "31.2rem", left: "45.3rem", Comp: Linebali, anchor: "top-right" },
    { id: "mataram", name: "Mataram", top: "31.2rem", left: "47.8rem", Comp: Linemataram, anchor: "bottom-left" },
    { id: "kupang", name: "Kupang", top: "35rem", left: "64rem", Comp: Linekupang, anchor: "top-left" },
    
    // Kalimantan
    { id: "palangkaraya", name: "Palangkaraya", top: "17.5rem", left: "42rem", Comp: Linepalangkaraya, anchor: "top-left" },
    { id: "banjarmasin", name: "Banjarmasin", top: "19.6rem", left: "44.2rem", Comp: Linebanjarmasin, anchor: "top-left" },
    { id: "balikpapan", name: "Balikpapan", top: "14.8rem", left: "48.5rem", Comp: Linebalikpapan, anchor: "bottom-left" },
    { id: "balikpapan-2", name: "Balikpapan", top: "14.8rem", left: "49.1rem", Comp: "", anchor: "bottom-left" },
    { id: "tarakan", name: "Tarakan", top: "5.2rem", left: "50.5rem", Comp: Linetarakan, anchor: "bottom-left" },
    { id: "pontianak", name: "Pontianak", top: "12.5rem", left: "32.5rem", Comp: Linepontianak, anchor: "bottom-left" },
    
    // Sulawesi
    { id: "manado", name: "Manado", top: "9.7rem", left: "66.6rem", Comp: Linemanado, anchor: "bottom-left" },
    { id: "gorontalo", name: "Gorontalo", top: "11.3rem", left: "62.4rem", Comp: Linegorontalo, anchor: "bottom-left" },
    { id: "palu", name: "Palu", top: "14.8rem", left: "55.5rem", Comp: Linepalu, anchor: "bottom-left" },
    { id: "mamuju", name: "Mamuju", top: "18.55rem", left: "53.7rem", Comp: Linemamuju, anchor: "top-right" },
    { id: "makassar", name: "Makassar", top: "22.85rem", left: "55.3rem", Comp: Linemakassar, anchor: "top-right" },
    { id: "makassar-2", name: "Makassar", top: "23.55rem", left: "55rem", Comp: "", anchor: "bottom-left" },
    { id: "kendari", name: "Kendari", top: "21.4rem", left: "61.4rem", Comp: Linekendari, anchor: "bottom-left" },
    { id: "ambon", name: "Ambon", top: "20.3rem", left: "73.8rem", Comp: Lineambon, anchor: "top-left" },
    
    // Papua
    { id: "jayapura", name: "Jayapura", top: "18.3rem", left: "101.5rem", Comp: Linejayapura, anchor: "bottom-left" },

];

export default function MapDots() {
    return (
        <div className="map" style={{ position: "relative" }}>
            <Image src={Map} alt="Indonesian Map | Map Indonesia" />
            {dots.map((dot) => (
                <div
                    key={dot.id}
                    style={{
                        position: "absolute",
                        top: dot.top,
                        left: dot.left,
                    }}
                >
                    <div className="dot-wrapper">
                        <div className="map-dot" />

                        {dot.Comp ? <dot.Comp
                            className={`dot-img anchor-${dot.anchor}`}
                            style={{
                                position: "absolute",
                                pointerEvents: "none",
                                top: dot.anchor === "top-right" ? 0 : dot.anchor === "top-left" ? 1 : 8,
                                left: dot.anchor === "top-right" ? 9 : 0,
                                // width: dot.width ? `${dot.width}px` : undefined,
                                // height: dot.height ? `${dot.height}px` : undefined,
                                transform:
                                    dot.anchor === "bottom-left"
                                        ? "translate(0, -100%)"
                                        : dot.anchor === "bottom-right"
                                            ? "translate(-100%, -100%)"
                                            : dot.anchor === "top-left"
                                                ? "translate(0, 0)"
                                                : dot.anchor === "top-right"
                                                    ? "translate(-100%, 0)"
                                                    : "translate(0, -100%)",

                                ...(dot.id === "aceh" && {
                                    top: 13,
                                    left: 0,
                                }),
                            }}
                        /> : ""}

                    </div>
                </div>
            ))}
        </div>
    );
}
