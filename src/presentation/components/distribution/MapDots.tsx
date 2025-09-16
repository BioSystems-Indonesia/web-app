import Image from "next/image";
import Map from "@/assets/img/home/map.png";

import Dashaceh from "@/assets/img/line/line-aceh.svg";
import Dashbatam from "@/assets/img/line/line-batam.svg";
import Dashbengkulu from "@/assets/img/line/line-bengkulu.svg";
import Dashjambi from "@/assets/img/line/line-jambi.svg";
import Dashlampung from "@/assets/img/line/line-lampung.svg";
import DashMedan from "@/assets/img/line/line-medan.svg";
import Dashpadang from "@/assets/img/line/line-padang.svg";
import Dashpalembang from "@/assets/img/line/line-palembang.svg";
import DashpangkalPinang from "@/assets/img/line/line-pangkal-pinang.svg";
import Dashpekanbaru from "@/assets/img/line/line-pekanbaru.svg";

const dots = [
    { id: "aceh", name: "Aceh", top: "1rem", left: "1.5rem", Comp: Dashaceh, width: 84, height: 44, anchor: "bottom-left" },
    { id: "medan", name: "Medan", top: "6rem", left: "8.5rem", Comp: DashMedan, width: 102, height: 42, anchor: "bottom-left" },
    { id: "pekanbaru", name: "Pekanbaru", top: "11rem", left: "13.4rem", Comp: Dashpekanbaru, width: 144, height: 70, anchor: "bottom-left" },
    { id: "padang", name: "Padang", top: "15rem", left: "13.5rem", Comp: Dashpadang, width: 134, height: 57.5, anchor: "top-right" },
    { id: "batam", name: "Batam", top: "10.5rem", left: "20.2rem", Comp: Dashbatam, width: 93, height: 41, anchor: "bottom-left" },
    { id: "bengkulu", name: "Bengkulu", top: "20.5rem", left: "17rem", Comp: Dashbengkulu, width: 116.5, height: 37, anchor: "top-right" },
    { id: "jambi", name: "Jambi", top: "15.5rem", left: "19rem", Comp: Dashjambi, width: 111, height: 72, anchor: "bottom-left" },
    { id: "jambi-2", name: "Jambi", top: "16.4rem", left: "19.3rem", Comp: "", width: 111, height: 72, anchor: "bottom-left" },
    { id: "palembang", name: "Palembang", top: "18.5rem", left: "22rem", Comp: "", width: 151, height: 79, anchor: "bottom-left" },
    { id: "palembang-2", name: "Palembang", top: "19rem", left: "22.5rem", Comp: Dashpalembang, width: 151, height: 79, anchor: "bottom-left" },
    { id: "palembang-3", name: "Palembang", top: "19.5rem", left: "23rem", Comp: "", width: 151, height: 79, anchor: "bottom-left" },
    { id: "lampung", name: "Lampung", top: "24rem", left: "23rem", Comp: Dashlampung, width: 124, height: 38.5, anchor: "top-right" },
    { id: "pangkalpinang", name: "Pangkalpinang", top: "18rem", left: "25.5rem", Comp: DashpangkalPinang, width: 129, height: 23, anchor: "bottom-left" },
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
                                top: dot.anchor === "top-right" ? 0 : 8,
                                left: dot.anchor === "top-right" ? 9 : 0,
                                width: dot.width ? `${dot.width}px` : undefined,
                                height: dot.height ? `${dot.height}px` : undefined,
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
