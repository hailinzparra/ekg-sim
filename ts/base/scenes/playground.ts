type ScenePlaygroundPropsDraggable = EKGLead

interface ScenePlaygroundProps {
    ekg_lead_1: EKGLead
    ekg_lead_2: EKGLead
    ekg_lead_3: EKGLead
    ekg_lead_avr: EKGLead
    ekg_lead_avl: EKGLead
    ekg_lead_avf: EKGLead
    ekg_lead_v1: EKGLead
    ekg_lead_v2: EKGLead
    ekg_lead_v3: EKGLead
    ekg_lead_v4: EKGLead
    ekg_lead_v5: EKGLead
    ekg_lead_v6: EKGLead
    init_ekg_lead(): void

    drag_obj: ScenePlaygroundPropsDraggable | null
    drag_offset: CoreVec2
    get_draggables(): ScenePlaygroundPropsDraggable[]
    dnd_logic(): void

    ekg_box_h: number
    ekg_box_small_box_size: number
    ekg_box_layout_ymargin: number
    ekg_box_main: EKGBox
    ekg_box_1: EKGBox
    ekg_box_2: EKGBox
    ekg_box_3: EKGBox
    ekg_box_avr: EKGBox
    ekg_box_avl: EKGBox
    ekg_box_avf: EKGBox
    ekg_box_v1: EKGBox
    ekg_box_v2: EKGBox
    ekg_box_v3: EKGBox
    ekg_box_v4: EKGBox
    ekg_box_v5: EKGBox
    ekg_box_v6: EKGBox
    init_ekg_box(): void
    point_inside_ekg_box(p: CoreVec2, ekg_box: EKGBox): boolean
    main_box_selection_logic(): void
    main_box_selection_render_ui(): void

    drawing_area_box_size: number
    render_drawing_area(): void
}

const scene_playground = new CoreScene<ScenePlaygroundProps>('Playground', {
    ekg_lead_1: new EKGLead('I', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(1, 0)),
    ekg_lead_2: new EKGLead('II', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(1, 60)),
    ekg_lead_3: new EKGLead('III', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(1, 120)),
    ekg_lead_avr: new EKGLead('aVR', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(1, -150)),
    ekg_lead_avl: new EKGLead('aVL', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(1, -30)),
    ekg_lead_avf: new EKGLead('aVF', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(1, 90)),
    ekg_lead_v1: new EKGLead('V1', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(0, 0)),
    ekg_lead_v2: new EKGLead('V2', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(0, 0)),
    ekg_lead_v3: new EKGLead('V3', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(0, 0)),
    ekg_lead_v4: new EKGLead('V4', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(0, 0)),
    ekg_lead_v5: new EKGLead('V5', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(0, 0)),
    ekg_lead_v6: new EKGLead('V6', '#ed597e', new CoreVec2(), CoreVec2.polar_deg(0, 0)),
    init_ekg_lead() {
        this.ekg_lead_1.axis.set_length(this.drawing_area_box_size * 3)
        this.ekg_lead_2.axis.set_length(this.drawing_area_box_size * 3)
        this.ekg_lead_3.axis.set_length(this.drawing_area_box_size * 3)
        this.ekg_lead_avr.axis.set_length(this.drawing_area_box_size * 3)
        this.ekg_lead_avl.axis.set_length(this.drawing_area_box_size * 3)
        this.ekg_lead_avf.axis.set_length(this.drawing_area_box_size * 3)
        this.ekg_lead_2.position.set(
            stage.size.x / 2,
            (stage.size.y - this.ekg_box_h * 4 - this.ekg_box_layout_ymargin * 2) / 2
        )
        obj.instantiate('ekg_lead', this.ekg_lead_2)
    },

    drag_obj: null,
    drag_offset: new CoreVec2(),
    get_draggables() {
        return obj.take<ScenePlaygroundPropsDraggable>('ekg_lead')
    },
    dnd_logic() {
        const draggables = this.get_draggables()

        if (this.drag_obj === null) {
            if (input.pointer_down()) {
                for (const n of draggables) {
                    if (n.mask.contains_point(input.pointer_position)) {
                        this.drag_obj = n
                        this.drag_offset.set(this.drag_obj.position).subtract(input.pointer_position)
                        break
                    }
                }
            }
        }
        else {
            if (input.pointer_hold()) {
                this.drag_obj.position.set(input.pointer_position).add(this.drag_offset)
                this.drag_obj.position.x = math.clamp(this.drag_obj.position.x, 0, stage.size.x)
                this.drag_obj.position.y = math.clamp(this.drag_obj.position.y, 0, stage.size.y - this.ekg_box_h * 4 - this.ekg_box_layout_ymargin * 2)
            }
            if (input.pointer_up()) {
                this.drag_obj = null
            }
        }
    },

    ekg_box_h: 120,
    ekg_box_small_box_size: 4,
    ekg_box_layout_ymargin: 8,
    ekg_box_main: new EKGBox(''),
    ekg_box_1: new EKGBox('I'),
    ekg_box_2: new EKGBox('II'),
    ekg_box_3: new EKGBox('III'),
    ekg_box_avr: new EKGBox('aVR'),
    ekg_box_avl: new EKGBox('aVL'),
    ekg_box_avf: new EKGBox('aVF'),
    ekg_box_v1: new EKGBox('V1'),
    ekg_box_v2: new EKGBox('V2'),
    ekg_box_v3: new EKGBox('V3'),
    ekg_box_v4: new EKGBox('V4'),
    ekg_box_v5: new EKGBox('V5'),
    ekg_box_v6: new EKGBox('V6'),
    init_ekg_box() {
        const s = this.ekg_box_small_box_size
        const w = Math.floor(stage.size.x / 4 / (s * 5)) * (s * 5)
        const h = this.ekg_box_h
        let x = (stage.size.x - w * 4) / 2
        let y = stage.size.y - h / 2 - this.ekg_box_layout_ymargin
        this.ekg_box_3.init(x, y, w, h, s, this.ekg_lead_3)
        this.ekg_box_avf.init(x + w, y, w, h, s, this.ekg_lead_avf)
        this.ekg_box_v3.init(x + 2 * w, y, w, h, s, this.ekg_lead_v3)
        this.ekg_box_v6.init(x + 3 * w, y, w, h, s, this.ekg_lead_v6)
        y -= h
        this.ekg_box_2.init(x, y, w, h, s, this.ekg_lead_2)
        this.ekg_box_avl.init(x + w, y, w, h, s, this.ekg_lead_avl)
        this.ekg_box_v2.init(x + 2 * w, y, w, h, s, this.ekg_lead_v2)
        this.ekg_box_v5.init(x + 3 * w, y, w, h, s, this.ekg_lead_v5)
        y -= h
        this.ekg_box_1.init(x, y, w, h, s, this.ekg_lead_1)
        this.ekg_box_avr.init(x + w, y, w, h, s, this.ekg_lead_avr)
        this.ekg_box_v1.init(x + 2 * w, y, w, h, s, this.ekg_lead_v1)
        this.ekg_box_v4.init(x + 3 * w, y, w, h, s, this.ekg_lead_v4)
        y -= h
        this.ekg_box_main.init(x, y, w * 4, h, s)
        this.ekg_box_main.lead = this.ekg_box_2.lead
        this.ekg_box_main.name = this.ekg_box_2.name
        obj.instantiate('ekg_box', this.ekg_box_main)
        obj.instantiate('ekg_box', this.ekg_box_1)
        obj.instantiate('ekg_box', this.ekg_box_2)
        obj.instantiate('ekg_box', this.ekg_box_3)
        obj.instantiate('ekg_box', this.ekg_box_avr)
        obj.instantiate('ekg_box', this.ekg_box_avl)
        obj.instantiate('ekg_box', this.ekg_box_avf)
        obj.instantiate('ekg_box', this.ekg_box_v1)
        obj.instantiate('ekg_box', this.ekg_box_v2)
        obj.instantiate('ekg_box', this.ekg_box_v3)
        obj.instantiate('ekg_box', this.ekg_box_v4)
        obj.instantiate('ekg_box', this.ekg_box_v5)
        obj.instantiate('ekg_box', this.ekg_box_v6)
    },
    point_inside_ekg_box(p, box) {
        return p.x > box.x && p.x < box.x + box.width
            && p.y > box.y - box.height / 2 && p.y < box.y + box.height / 2
    },
    main_box_selection_logic() {
        if (this.drag_obj !== null) return
        for (const box of obj.take<EKGBox>('ekg_box')) {
            if (box === this.ekg_box_main) continue
            if (this.point_inside_ekg_box(input.pointer_position, box)) {
                if (input.pointer_down() || input.pointer_hold()) {
                    this.ekg_box_main.lead = box.lead
                    this.ekg_box_main.name = box.name
                    box.set_scale_to(0.95, 0.95)

                    if (this.ekg_box_main.lead) {
                        const leads = obj.take<EKGLead>('ekg_lead')
                        if (leads[0]) {
                            this.ekg_box_main.lead.position.set(leads[0].position)
                        }
                        else {
                            this.ekg_box_main.lead.position.set(stage.size.x / 2, stage.size.y / 4)
                        }
                        obj.clear('ekg_lead')
                        obj.instantiate('ekg_lead', this.ekg_box_main.lead)
                    }
                }
            }
        }
    },
    main_box_selection_render_ui() {
        draw.set_color(`hsl(0, 0%, ${Math.max(0, Math.cos(time.t * 0.008)) * 30}%)`)

        const main = this.ekg_box_main
        for (const box of obj.take<EKGBox>('ekg_box')) {
            if (box === main) continue
            if (box.lead === main.lead && box.name === main.name) {
                draw.rect(box.x, box.y - box.height / 2, box.width, box.height, true)
            }
        }
    },

    drawing_area_box_size: 64,
    render_drawing_area() {
        const h = stage.size.y - this.ekg_box_h * 4 - this.ekg_box_layout_ymargin * 2
        const s = this.drawing_area_box_size
        const tile_xamount = Math.ceil(stage.size.x / s)
        const tile_yamount = Math.ceil(h / s)
        const tile_xoffset = (stage.size.x - tile_xamount * s) / 2
        const tile_yoffset = (h - tile_yamount * s) / 2

        draw.set_color('#34027a')
        draw.rect(0, 0, stage.size.x, h)

        draw.set_color('#3823a3')
        draw.ctx.lineWidth = 4
        for (let x = 0; x < tile_xamount; x++) {
            draw.line(tile_xoffset + x * s, 0, tile_xoffset + x * s, h)
        }
        for (let y = 0; y < tile_yamount; y++) {
            draw.line(0, tile_yoffset + y * s, stage.size.x, tile_yoffset + y * s)
        }
        draw.ctx.lineWidth = 1

        // border bottom
        draw.line(0, h, stage.size.x, h)
    },
})

scene_playground.start = () => {
    scene_playground.props.init_ekg_lead()
    scene_playground.props.init_ekg_box()
}

scene_playground.update = () => {
    scene_playground.props.dnd_logic()
    scene_playground.props.main_box_selection_logic()
}

scene_playground.render = () => {
    scene_playground.props.render_drawing_area()
}

scene_playground.render_ui = () => {
    scene_playground.props.main_box_selection_render_ui()

    debug.draw_fps(0, 0)
}
