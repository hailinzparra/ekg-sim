class EKGBox extends CoreObject {
    width: number = 0
    height: number = 0
    small_box_size: number = 0
    small_box_xamount: number = 0
    small_box_yamount: number = 0
    large_box_size: number = 0
    large_box_xamount: number = 0
    large_box_yamount: number = 0

    lead: EKGLead | null = null

    xs: number = 1
    ys: number = 1
    xsto: number = 1
    ysto: number = 1

    constructor(
        public name: string,
    ) {
        super(0, 0)
    }

    init(x: number, y: number, width: number, height: number, small_box_size: number, lead?: EKGLead) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.small_box_size = small_box_size
        this.small_box_xamount = Math.ceil(this.width / this.small_box_size)
        this.small_box_yamount = Math.ceil(this.height / this.small_box_size)
        this.large_box_size = this.small_box_size * 5
        this.large_box_xamount = Math.ceil(this.width / this.large_box_size)
        this.large_box_yamount = Math.ceil(this.height / this.large_box_size)
        if (lead) this.lead = lead
    }

    draw_small_box() {
        const small_box_xstart = -this.width / 2
        const small_box_ystart = -this.height / 2
        for (let x = 0; x < this.small_box_xamount; x++) {
            draw.line(
                small_box_xstart + x * this.small_box_size,
                small_box_ystart,
                small_box_xstart + x * this.small_box_size,
                small_box_ystart + this.height,
            )
        }
        for (let y = 0; y < this.small_box_yamount; y++) {
            draw.line(
                small_box_xstart,
                small_box_ystart + y * this.small_box_size,
                small_box_xstart + this.width,
                small_box_ystart + y * this.small_box_size,
            )
        }
    }

    draw_large_box() {
        const large_box_xstart = -this.width / 2
        const large_box_ystart = -this.height / 2
        for (let x = 1; x < this.large_box_xamount; x++) {
            draw.line(
                large_box_xstart + x * this.large_box_size,
                large_box_ystart,
                large_box_xstart + x * this.large_box_size,
                large_box_ystart + this.height,
            )
        }
        for (let y = 1; y < this.large_box_yamount; y++) {
            draw.line(
                large_box_xstart,
                large_box_ystart + y * this.large_box_size,
                large_box_xstart + this.width,
                large_box_ystart + y * this.large_box_size,
            )
        }
    }

    draw_border() {
        draw.rect(-this.width / 2, -this.height / 2, this.width, this.height, true)
    }

    draw_name() {
        draw.set_font(font.s, { size: this.small_box_size * 4, family: 'serif' })
        draw.set_hvalign('left', 'top')
        draw.text(-this.width / 2 + this.small_box_size, this.small_box_size, this.name)
    }

    draw_lead() {
        if (this.lead === null) return
    }

    set_scale_to(xsto: number, ysto: number) {
        this.xsto = xsto
        this.ysto = ysto
    }

    update_scale() {
        this.xs += (this.xsto - this.xs) * 0.5 * time.cdt
        this.ys += (this.ysto - this.ys) * 0.5 * time.cdt

        if (this.xsto > 1) this.xsto -= 0.05 * time.cdt
        if (this.ysto > 1) this.ysto -= 0.05 * time.cdt
        if (this.xsto < 1) this.xsto += 0.05 * time.cdt
        if (this.ysto < 1) this.ysto += 0.05 * time.cdt
        if (Math.abs(1 - this.xsto) < 0.05) this.xsto = 1
        if (Math.abs(1 - this.ysto) < 0.05) this.ysto = 1
    }

    post_update(): void {
        this.update_scale()
    }

    render(): void {
        draw.on_transform(
            this.x + this.width / 2,
            this.y,
            this.xs,
            this.ys,
            0, () => {
                draw.set_color('#edbac7')
                this.draw_small_box()
                draw.set_color('#ed597e')
                this.draw_large_box()
                this.draw_border()
                draw.set_color('#000')
                this.draw_name()
                this.draw_lead()
            }
        )
    }
}

obj.add_name('ekg_box')
