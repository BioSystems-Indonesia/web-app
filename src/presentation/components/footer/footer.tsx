"use client"
import YTIcon from "@/presentation/components/icon/yt.svg"
import IGIcon from "@/presentation/components/icon/ig.svg"
import LinkedinIcon from "@/presentation/components/icon/linkedin.svg"
import "./footer.css"

type FooterProps = {
    bgColor?: string;
}

export default function Footer({ bgColor = 'transparent' }: FooterProps) {
    return (
        <footer style={{ backgroundColor: bgColor }}>
            <div className="social" role="navigation" aria-label="Social media links">
                <a
                    href="https://linkedin.com/company/biosystems-indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our LinkedIn page"
                >
                    <LinkedinIcon aria-hidden="true" />
                </a>
                <a
                    href="https://instagram.com/biosystems.indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram page"
                >
                    <IGIcon aria-hidden="true" />
                </a>
                <a
                    href="https://youtube.com/@biosystemsindonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our YouTube channel"
                >
                    <YTIcon aria-hidden="true" />
                </a>
            </div>
            <div style={{ textAlign: 'end' }}>
                <p>All rights reserved.</p>
                <p>{new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}