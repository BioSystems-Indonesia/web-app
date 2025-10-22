"use client"
import YTIcon from "@/presentation/components/icon/yt.svg"
import IGIcon from "@/presentation/components/icon/ig.svg"
import LinkedinIcon from "@/presentation/components/icon/linkedin.svg"


type FooterProps = {
    bgColor?: string;
}

export default function Footer({ bgColor = 'transparent' }: FooterProps) {
    return (
        <footer style={{ backgroundColor: bgColor }}>
            <div className="social">
                <LinkedinIcon />
                <IGIcon />
                <YTIcon />
            </div>
            <div style={{ textAlign: 'end' }}>
                <p>All rights reserved.</p>
                <p>{new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}