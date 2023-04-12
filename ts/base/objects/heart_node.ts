class HeartNode extends CoreObject {
    name: string
    size: number
    circle_mask_r: number
    vec_polar: CoreVec2
    color: string = 'red'
    recorded_amplitude: number[] = [0]
    can_record: boolean = true
    record_alarm: Alarm = new Alarm(16)
    ekg_column_amount: number = 100
    constructor(
        name: string, x: number, y: number, size: number,
        vec_polar: CoreVec2, color?: string
    ) {
        super(x, y)
        this.name = name
        this.size = size
        this.circle_mask_r = this.size
        this.vec_polar = vec_polar
        if (color) this.color = color
        this.record_alarm.on_alarm(() => {
            this.can_record = true
        })
    }
    pre_update(): void {
        this.record_alarm.update()
    }
    intersect_circle(x: number, y: number, r: number) {
        return Math.hypot(this.x - x, this.y - y) < this.circle_mask_r + r
    }
    intersect_vec_polar(x: number, y: number, distance_tolerance: number = 12) {
        return Math.hypot(this.x + this.vec_polar.x - x, this.y + this.vec_polar.y - y) < distance_tolerance
    }
    render(): void {
        draw.set_color('#adbad7')
        draw.circle(this.x, this.y, this.size)
        draw.set_color(this.color)
        // Draw arrow
        const arrow_end = {
            x: this.x + this.vec_polar.x,
            y: this.y + this.vec_polar.y,
        }
        draw.circle(this.x, this.y, this.size * 0.5)
        draw.ctx.lineWidth = 4
        draw.ctx.lineCap = 'round'
        draw.ctx.lineJoin = 'round'
        draw.line(this.x, this.y, arrow_end.x, arrow_end.y)
        // arrow point
        for (let i = 0; i < 2; i++) {
            const arrow_point_angle = 60
            const arrow_point_length = 20
            const arrow_point_polar = CoreVec2.polar(arrow_point_length, 180 + this.vec_polar.get_direction_deg() - arrow_point_angle / 2 + arrow_point_angle * i)
            draw.line(arrow_end.x, arrow_end.y, arrow_end.x + arrow_point_polar.x, arrow_end.y + arrow_point_polar.y)
        }
    }
    render_ui(): void {
        const name_text = `${this.name}`
        draw.set_font(font.m)

        const name_text_width = draw.get_text_width(name_text)
        const name_text_height = draw.get_text_height(name_text)

        draw.set_hvalign('center', 'bottom')
        draw.set_color(this.color)
        draw.text(this.x, this.y - this.size - 2, name_text)

        draw.set_font(font.s)
        draw.set_hvalign('left', 'middle')
        draw.text(
            this.x + name_text_width / 2 + 2,
            this.y - this.size - 2 - name_text_height,
            `(${Math.round(this.vec_polar.get_length() / grid_size * 100) / 100}, ${Math.round(this.vec_polar.get_direction_deg())}°)`
        )
    }
    draw_ekg_box(target_node: HeartNode, x: number, y: number, w: number, h: number) {
        draw.ctx.lineWidth = 2
        draw.set_color('white')
        draw.rect(x, y, w, h, true)

        if (this.can_record) {
            console.log('recording')
            this.recorded_amplitude.push(Math.round(this.vec_polar.dot(target_node.vec_polar) / grid_size / 100) / 10 * target_node.vec_polar.get_length())
            this.can_record = false
            this.record_alarm.restart()
        }

        if (this.recorded_amplitude.length > this.ekg_column_amount) {
            this.recorded_amplitude.shift()
        }

        draw.set_font(font.m)
        draw.set_hvalign('left', 'bottom')
        draw.text(x + 2, y + h - 2, `${Math.round(this.recorded_amplitude[this.recorded_amplitude.length - 1])}`)

        draw.ctx.beginPath()
        draw.ctx.moveTo(x, y + h / 2 - this.recorded_amplitude[0])
        for (let i = 1; i < this.recorded_amplitude.length; i++) {
            draw.ctx.lineTo(x + i * w / (this.ekg_column_amount - 1), y + h / 2 - this.recorded_amplitude[i])
        }
        draw.ctx.stroke()
    }
}

obj.add_name('heart_node')
