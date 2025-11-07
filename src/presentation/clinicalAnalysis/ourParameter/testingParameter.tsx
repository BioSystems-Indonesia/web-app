"use client"
import { useState } from "react"
import "./testingParameter.css"
import PanelIcon from '@/presentation/components/icon/panel.svg'
import AnemiaIcon from '@/presentation/components/icon/anemia.svg'
import CardicIcon from '@/presentation/components/icon/cardiac.svg'
import DiabeticIcon from '@/presentation/components/icon/diabetic.svg'
import FertilityIcon from '@/presentation/components/icon/fertility.svg'
import GastricIcon from '@/presentation/components/icon/gastric.svg'
import HemostasisIcon from '@/presentation/components/icon/hemostasis.svg'
import immuneIcon from '@/presentation/components/icon/immune.svg'
import infectiousIcon from '@/presentation/components/icon/infectius.svg'
import InflammatoryIcon from '@/presentation/components/icon/inflamatory.svg'
import IonsIcon from '@/presentation/components/icon/ions.svg'
import LipidIcon from '@/presentation/components/icon/lipid.svg'
import LiverIcon from '@/presentation/components/icon/liver.svg'
import PancreaticIcon from '@/presentation/components/icon/pancreatic.svg'
import RenalIcon from '@/presentation/components/icon/renal.svg'
import { ComponentType, SVGProps } from 'react'

interface AssayItem {
    analyzer: string;
    code: string;
    RA: string;
    RB: string;
    mLPerKit: string;
}

interface AnemiaPanel {
    name: string;
    method: string;
    unit: string;
    items: AssayItem[];
}

interface TestingPanel {
    title: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function TestingParameterSection() {
    const [panelActive, setIsactive] = useState<number>(0)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const testingPanel: TestingPanel[] = [
        { title: "Anemia", icon: AnemiaIcon },
        { title: "Cardiac", icon: CardicIcon },
        { title: "Diabetic", icon: DiabeticIcon },
        { title: "Fertility", icon: FertilityIcon },
        { title: "Gastric", icon: GastricIcon },
        { title: "Hemostasis", icon: HemostasisIcon },
        { title: "Immune", icon: immuneIcon },
        { title: "Infectious", icon: infectiousIcon },
        { title: "Inflammatory", icon: InflammatoryIcon },
        { title: "Ions", icon: IonsIcon },
        { title: "Lipid", icon: LipidIcon },
        { title: "Liper", icon: LiverIcon },
        { title: "Pancreatic", icon: PancreaticIcon },
        { title: "Rendal", icon: RenalIcon },
    ]

    const toggleCard = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const chemistryPanels: AnemiaPanel[] = [
        {
            name: "FERRITIN",
            method: "Immunoturbidimetric latex assay",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31934", RA: "1×30 mL", RB: "1×15 mL", mLPerKit: "1×15 mL" },
                { analyzer: "Manual", code: "31935", RA: "1×10 mL", RB: "1×5 mL", mLPerKit: "1×5 mL" },
                { analyzer: "BA200, BA400", code: "23934", RA: "1×40 mL", RB: "1×20 mL", mLPerKit: "1×20 mL" },
                { analyzer: "BA200, BA400", code: "22934", RA: "2×40 mL", RB: "2×40 mL", mLPerKit: "2×40 mL" },
                { analyzer: "A15, A25", code: "13934", RA: "1×30 mL", RB: "1×30 mL", mLPerKit: "1×30 mL" },
            ],
        },
        {
            name: "GLUCOSE-6-PHOSPHATE DEHYDROGENASE",
            method: "Kinetic UV test",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31450", RA: "1×20 mL", RB: "1×10 mL", mLPerKit: "1×10 mL" },
                { analyzer: "BA400", code: "22450", RA: "2×20 mL", RB: "2×10 mL", mLPerKit: "2×10 mL" },
                { analyzer: "A15, A25", code: "12450", RA: "1×25 mL", RB: "1×12.5 mL", mLPerKit: "1×12.5 mL" },
            ],
        },
        {
            name: "HAPTOGLOBIN",
            method: "Immunoturbidimetric assay",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31940", RA: "1×30 mL", RB: "1×15 mL", mLPerKit: "1×15 mL" },
                { analyzer: "BA400", code: "22940", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "IRON–CHROMAZUROL",
            method: "Colorimetric method",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31720", RA: "1×20 mL", RB: "1×10 mL", mLPerKit: "1×10 mL" },
                { analyzer: "BA400", code: "22720", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "IRON–FERROZINE",
            method: "Colorimetric method (Ferrozine)",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31725", RA: "1×20 mL", RB: "1×10 mL", mLPerKit: "1×10 mL" },
                { analyzer: "BA400", code: "22725", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "LACTATE DEHYDROGENASE (LDH)",
            method: "Kinetic UV test",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31410", RA: "1×20 mL", RB: "1×10 mL", mLPerKit: "1×10 mL" },
                { analyzer: "BA400", code: "22410", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "LACTATE DEHYDROGENASE (LDH) - IFCC",
            method: "Kinetic UV test (IFCC)",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31412", RA: "1×20 mL", RB: "1×10 mL", mLPerKit: "1×10 mL" },
                { analyzer: "BA400", code: "22412", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "TOTAL IRON BINDING CAPACITY (TIBC)",
            method: "Colorimetric method",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31750", RA: "1×30 mL", RB: "1×15 mL", mLPerKit: "1×15 mL" },
                { analyzer: "BA400", code: "22750", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "TRANSFERRIN",
            method: "Immunoturbidimetric assay",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31970", RA: "1×30 mL", RB: "1×15 mL", mLPerKit: "1×15 mL" },
                { analyzer: "BA400", code: "22970", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "TRANSFERRIN [BIREAGENT]",
            method: "Immunoturbidimetric assay (Bireagent)",
            unit: "mL/Kit",
            items: [
                { analyzer: "Manual", code: "31975", RA: "1×30 mL", RB: "1×15 mL", mLPerKit: "1×15 mL" },
                { analyzer: "BA400", code: "22975", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
        {
            name: "UNSATURATED IRON BINDING CAPACITY (UIBC)",
            unit: "mL/Kit",
            method: "Colorimetric method",
            items: [
                { analyzer: "Manual", code: "31760", RA: "1×30 mL", RB: "1×15 mL", mLPerKit: "1×15 mL" },
                { analyzer: "BA400", code: "22760", RA: "2×40 mL", RB: "2×20 mL", mLPerKit: "2×20 mL" },
            ],
        },
    ];

    // map categories to chemistry panels (extend this mapping as you add data)
    const panelsByCategory: Record<string, AnemiaPanel[]> = testingPanel.reduce((acc, p) => {
        acc[p.title] = [];
        return acc;
    }, {} as Record<string, AnemiaPanel[]>);

    panelsByCategory['Anemia'] = chemistryPanels;
    panelsByCategory['Cardiac'] = chemistryPanels;

    const activePanel = testingPanel[panelActive] || testingPanel[0];
    const activeChemistries = panelsByCategory[activePanel.title] || [];

    const filterClick = (index: number) => {
        setIsactive(index)
    }
    return (
        <section className="testing-parameter">
            <div className="head">
                <h1>Our Testing Parameters</h1>
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
                                    if (e.key === 'Enter' || e.key === ' ') filterClick(index)
                                }}
                            >
                                {testing.title.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                    <div className="parameter">
                        <div className="category">
                            {activePanel.icon && <activePanel.icon />}
                            <h4>{activePanel.title}</h4>
                        </div>
                        <ul className="parameter-list">
                            {activeChemistries.map((chemistry, index) => (
                                <li onClick={() => toggleCard(index)}
                                    key={index} style={{ display: "flex", flexDirection: "column", backgroundColor: expandedIndex === index ? "rgba(106, 106, 106, 0.05)" : "", cursor: "pointer" }}>
                                    <div
                                        className="title"

                                    >
                                        <p className={"title-text " + (expandedIndex === index ? "hidden" : "visible")}>{chemistry.name}</p>
                                        <p className={"plus " + (expandedIndex === index ? "" : "rotated")}>
                                            +
                                        </p>
                                    </div>
                                    <div className={"card " + (expandedIndex === index ? "open" : "")}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "75rem" }}>
                                                        {/* <span className={"th-text " + (expandedIndex === index ? "visible" : "hidden")}>{chemistry.name}</span> */}
                                                    </th>
                                                    <th style={{ width: "10rem", textAlign: "start" }}>Code</th>
                                                    <th style={{ width: "10rem", textAlign: "start" }}>RA</th>
                                                    <th style={{ width: "10rem", textAlign: "start" }}>RB</th>
                                                    <th style={{ width: "10rem", textAlign: "start" }}>{chemistry.unit}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={5} style={{ paddingLeft: "30px", paddingBottom: "2rem" }}>
                                                        {chemistry.method}
                                                    </td>
                                                </tr>
                                                {chemistry.items.map((item, idx) => (

                                                    <tr key={idx} >
                                                        <td style={{ paddingLeft: "30px", textAlign: "start" }}>{item.analyzer}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.RA}</td>
                                                        <td>{item.RB}</td>
                                                        <td>{item.mLPerKit}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p style={{ paddingLeft: "30px", marginTop: "30px" }}>More Details</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}