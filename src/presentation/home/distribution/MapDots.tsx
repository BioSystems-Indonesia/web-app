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
    { id: "aceh", name: "Aceh", top: "4.46%", left: "7%", Comp: Lineaceh, anchor: "bottom-left" },
    { id: "medan", name: "Medan", top: "15.14%", left: "13.17%", Comp: LineMedan, anchor: "bottom-left" },
    { id: "pekanbaru", name: "Pekanbaru", top: "30.03%", left: "17.50%", Comp: Linepekanbaru, anchor: "bottom-left" },
    { id: "padang", name: "Padang", top: "39.76%", left: "16.90%", Comp: Linepadang, anchor: "top-right" },
    { id: "batam", name: "Batam", top: "29.00%", left: "23.30%", Comp: Linebatam, anchor: "bottom-left" },
    { id: "bengkulu", name: "Bengkulu", top: "55.10%", left: "20.55%", Comp: Linebengkulu, anchor: "top-right" },
    { id: "jambi", name: "Jambi", top: "41.29%", left: "22.42%", Comp: Linejambi, anchor: "bottom-left" },
    { id: "jambi-2", name: "Jambi", top: "42.56%", left: "22.63%", Comp: "", anchor: "bottom-left" },
    { id: "palembang", name: "Palembang", top: "50.46%", left: "24.97%", Comp: "", anchor: "bottom-left" },
    { id: "palembang-2", name: "Palembang", top: "51.49%", left: "25.27%", Comp: Linepalembang, anchor: "bottom-left" },
    { id: "palembang-3", name: "Palembang", top: "52.80%", left: "25.45%", Comp: "", anchor: "bottom-left" },
    { id: "lampung", name: "Lampung", top: "63.57%", left: "25.66%", Comp: Linelampung, anchor: "top-right" },
    { id: "pangkalpinang", name: "Pangkalpinang", top: "48.03%", left: "27.30%", Comp: LinepangkalPinang, anchor: "bottom-left" },

    // Jawa
    { id: "serang", name: "Serang", top: "69.19%", left: "27.14%", Comp: Lineserang, anchor: "bottom-left" },
    { id: "rangkasbitung", name: "Rangkasbitung", top: "72.01%", left: "27.42%", Comp: Linerangkas, anchor: "top-right" },
    { id: "jakarta", name: "Jakarta", top: "69.29%", left: "28.90%", Comp: Linejakarta, anchor: "bottom-left" },
    { id: "jakarta-2", name: "Jakarta", top: "69.94%", left: "29.30%", Comp: "", anchor: "bottom-left" },
    { id: "subang", name: "Subang", top: "71.14%", left: "30.28%", Comp: Linesubang, anchor: "bottom-left" },
    { id: "bogor", name: "Bogor", top: "73.54%", left: "29.29%", Comp: Linebogor, anchor: "top-right" },
    { id: "cirebon", name: "Cirebon", top: "71.14%", left: "31.55%", Comp: Linecirebon, anchor: "bottom-left" },
    { id: "bandung", name: "Bandung", top: "74.93%", left: "30.57%", Comp: Linebandung, anchor: "top-right" },
    { id: "semarang", name: "Semarang", top: "73.66%", left: "35.98%", Comp: Linesemarang, anchor: "bottom-left" },
    { id: "yogya", name: "DI Yogyakarta", top: "79.34%", left: "35.98%", Comp: Lineyogya, anchor: "top-right" },
    { id: "surabaya", name: "Surabaya", top: "75.43%", left: "39.52%", Comp: Linesurabaya, anchor: "bottom-left" },
    { id: "surabaya-2", name: "Surabaya", top: "75.43%", left: "40.01%", Comp: "", anchor: "bottom-left" },
    { id: "malang", name: "Malang", top: "79.51%", left: "40.11%", Comp: Linemalang, anchor: "top-right" },
    { id: "kediri", name: "Kediri", top: "78.86%", left: "38.25%", Comp: Linekediri, anchor: "top-right" },
    { id: "bali", name: "Bali", top: "83.14%", left: "44.93%", Comp: Linebali, anchor: "top-right" },
    { id: "mataram", name: "Mataram", top: "83.14%", left: "46.89%", Comp: Linemataram, anchor: "bottom-left" },
    { id: "kupang", name: "Kupang", top: "92%", left: "61%", Comp: Linekupang, anchor: "top-left" },

    // Kalimantan
    { id: "palangkaraya", name: "Palangkaraya", top: "47%", left: "42.08%", Comp: Linepalangkaraya, anchor: "top-left" },
    { id: "banjarmasin", name: "Banjarmasin", top: "53%", left: "44.26%", Comp: Linebanjarmasin, anchor: "top-left" },
    { id: "balikpapan", name: "Balikpapan", top: "40.29%", left: "47.68%", Comp: Linebalikpapan, anchor: "bottom-left" },
    { id: "balikpapan-2", name: "Balikpapan", top: "40.29%", left: "48.23%", Comp: "", anchor: "bottom-left" },
    { id: "tarakan", name: "Tarakan", top: "15.86%", left: "49.25%", Comp: Linetarakan, anchor: "bottom-left" },
    { id: "pontianak", name: "Pontianak", top: "34.71%", left: "33.92%", Comp: Linepontianak, anchor: "bottom-left" },

    // Sulawesi
    { id: "manado", name: "Manado", top: "26.51%", left: "63.52%", Comp: Linemanado, anchor: "bottom-left" },
    { id: "gorontalo", name: "Gorontalo", top: "31.29%", left: "59.58%", Comp: Linegorontalo, anchor: "bottom-left" },
    { id: "palu", name: "Palu", top: "40.29%", left: "53.88%", Comp: Linepalu, anchor: "bottom-left" },
    { id: "mamuju", name: "Mamuju", top: "50.50%", left: "52.13%", Comp: Linemamuju, anchor: "top-right" },
    { id: "makassar", name: "Makassar", top: "61.29%", left: "53.58%", Comp: Linemakassar, anchor: "top-right" },
    { id: "makassar-2", name: "Makassar", top: "62.49%", left: "53.39%", Comp: "", anchor: "bottom-left" },
    { id: "kendari", name: "Kendari", top: "57.14%", left: "58.69%", Comp: Linekendari, anchor: "bottom-left" },
    { id: "ambon", name: "Ambon", top: "54.40%", left: "69.55%", Comp: Lineambon, anchor: "top-left" },

    // Papua
    { id: "jayapura", name: "Jayapura", top: "49.79%", left: "93.50%", Comp: Linejayapura, anchor: "bottom-left" },
];



export default function MapDots() {
    return (
        <div className="map">
            <Image
                src={Map}
                alt="Map Indonesia"
                fill
                style={{ objectFit: "contain", }}
            />

            <div className="dot-frame">
                {dots.map(dot => (
                    <div
                        key={dot.id}
                        className="dot-position"
                        style={{ top: dot.top, left: dot.left }}
                    >
                        <div className="map-dot" />
                        {dot.Comp && (
                            <dot.Comp className={`dot-img anchor-${dot.anchor}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
}
