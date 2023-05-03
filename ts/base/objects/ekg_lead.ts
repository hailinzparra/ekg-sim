class EKGLead extends CoreGameObject {
    constructor(
        public name: string,
        public color: string,
        position: CoreVec2,
        public axis: CoreVec2,
    ) {
        super(position)
        this.mask.children.push(
            new CoreGameObjectMaskCircle(
                this.mask,
                new CoreVec2(),
                24,
            )
        )
    }

    render(): void {
        const c1 = Math.cos(time.t * 0.002)
        const c2 = Math.cos(time.t * 0.001)

        const lw = 4

        draw.set_alpha(0.5)
        draw.set_color('#fff')
        draw.circle(this.position.x, this.position.y, lw * 6 + c1)
        draw.reset_alpha()

        draw.set_color(this.color)

        draw.ctx.lineWidth = lw
        draw.ctx.lineJoin = 'round'
        draw.ctx.lineCap = 'round'
        draw.ctx.setLineDash([lw * 4, lw * 2])
        draw.ctx.lineDashOffset = -Math.round(time.t * 0.04)
        draw.line(
            this.position.x,
            this.position.y,
            this.position.x + this.axis.x,
            this.position.y + this.axis.y,
        )
        draw.ctx.setLineDash([])
        draw.ctx.lineCap = 'butt'
        draw.ctx.lineJoin = 'miter'
        draw.ctx.lineWidth = 1

        const a = this.axis.get_angle_deg()
        const sign = a === 0 ? '' : Math.abs(a) === 180 ? '+/-' : Math.sign(a) > 0 ? '+' : ''

        draw.on_transform(
            this.position.x + this.axis.x,
            this.position.y + this.axis.y,
            1, 1, a, () => {
                const t = `${sign}${Math.round(a)}°`

                draw.set_font(font.s.bold())
                const w = draw.get_text_width(t)
                const h = draw.get_text_height(t) * 1.2

                draw.set_color('#fff')
                draw.circle(-h + c1, 0, h / 2)

                draw.set_color('#000')
                draw.circle(-h - h / 2 + h / 5 - c1 / 2, c2, h / 6)

                draw.set_color(this.color)
                draw.ctx.beginPath()
                draw.ctx.moveTo(0, h / 2)
                draw.ctx.lineTo(-h, h + (-0.5 + c1))
                draw.ctx.lineTo(-h, -h - (-0.5 + c1))
                draw.ctx.lineTo(0, -h / 2)
                draw.ctx.closePath()
                draw.ctx.fill()

                // draw.rect(0, -h / 2, w * 1.2, h)

                draw.set_color('#fff')
                draw.set_hvalign('left', 'middle')
                draw.text(w * 0.09, h * 0.04, t)

                draw.set_hvalign('right', 'bottom')
                draw.text(-h * 2, -lw, this.name)
            }
        )

        draw.set_color(this.color)
        draw.circle(this.position.x, this.position.y, lw * 2)
    }
}

obj.add_name('ekg_lead')
