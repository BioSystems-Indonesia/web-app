import "./CTASection.css"
import CTAImg from "@/assets/img/home/cta.png"
import LocIcon from "@/presentation/components/icon/loc.png"
import callIcon from "@/presentation/components/icon/call.png"
import Image from "next/image"
import { StaticImageData } from "next/image"

type CTASectionProps = {
    contentBg?: string;
    contentColor?: string;
    iconColor?: string; // accepts any CSS color or a css filter-friendly value
}

export default function CTASection({ contentBg = "transparent", contentColor = "inherit", iconColor = "#121212" }: CTASectionProps) {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="head">
                    <h2>We would be glad to help you!</h2>
                </div>
                <div className="cta">
                    <div className="content" style={{ backgroundColor: contentBg, color: contentColor }}>
                        <div className="addr">
                            <div className="title">
                                <span
                                    className="icon-mask"
                                    aria-hidden
                                    style={{
                                        backgroundColor: iconColor,
                                        WebkitMaskImage: `url(${(LocIcon as StaticImageData).src})`,
                                        maskImage: `url(${(LocIcon as StaticImageData).src})`,
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskSize: 'contain',
                                        maskSize: 'contain',
                                        width: 33,
                                        height: 33,
                                        display: 'inline-block'
                                    }}
                                />
                                <h5>Address</h5>
                            </div>
                            <p>Jl. Kyai Caringin No. 18-A RT 10/RW 4. Cideng, Kecamatan Gambir, Kota Jakarta Pusat. Daerah Khusus Ibukota Jakarta</p>
                        </div>
                        <div className="call">
                            <div className="title">
                                <span
                                    className="icon-mask"
                                    aria-hidden
                                    style={{
                                        backgroundColor: iconColor,
                                        WebkitMaskImage: `url(${(callIcon as StaticImageData).src})`,
                                        maskImage: `url(${(callIcon as StaticImageData).src})`,
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskSize: 'contain',
                                        maskSize: 'contain',
                                        width: 33,
                                        height: 33,
                                        display: 'inline-block'
                                    }}
                                />
                                <h5>Phone</h5>
                            </div>
                            <p>Customer Care +62 817-887-060 </p>
                            <p>Telemarketing  +62 811-712-906</p>
                        </div>
                    </div>
                    <Image src={CTAImg} alt="call to action" />
                </div>
            </div>
        </section>
    )
}