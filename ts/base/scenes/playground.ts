interface ScenePlaygroundProps {
    ekg_box_h: number
    ekg_box_small_box_size: number
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
    point_inside_ekg_box(p: CoreVec2, ekg_box: EKGBox): boolean
    main_box_selection_logic(): void
    main_box_selection_render(): void
}

const scene_playground = new CoreScene<ScenePlaygroundProps>('Playground', {
    ekg_box_h: 120,
    ekg_box_small_box_size: 4,
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
    point_inside_ekg_box(p, box) {
        return p.x > box.x && p.x < box.x + box.width
            && p.y > box.y - box.height / 2 && p.y < box.y + box.height / 2
    },
    main_box_selection_logic() {
        if (input.pointer_down() || input.pointer_hold()) {
            for (const box of obj.take<EKGBox>('ekg_box')) {
                if (box === this.ekg_box_main) continue
                if (this.point_inside_ekg_box(input.pointer_position, box)) {
                    this.ekg_box_main.lead = box.lead
                    this.ekg_box_main.name = box.name
                }
            }
        }
    },
    main_box_selection_render() {
        draw.set_color('#000')
        const main = this.ekg_box_main
        for (const box of obj.take<EKGBox>('ekg_box')) {
            if (box === main) continue
            if (box.lead === main.lead && box.name === main.name) {
                draw.rect(box.x, box.y - box.height / 2, box.width, box.height, true)
            }
        }
    },
})

scene_playground.start = () => {
    const p = scene_playground.props
    const s = p.ekg_box_small_box_size
    const w = Math.floor(stage.size.x / 4 / (s * 5)) * (s * 5)
    const h = p.ekg_box_h
    let x = (stage.size.x - w * 4) / 2
    let y = stage.size.y - h / 2
    p.ekg_box_3.init(x, y, w, h, s)
    p.ekg_box_avf.init(x + w, y, w, h, s)
    p.ekg_box_v3.init(x + 2 * w, y, w, h, s)
    p.ekg_box_v6.init(x + 3 * w, y, w, h, s)
    y -= h
    p.ekg_box_2.init(x, y, w, h, s)
    p.ekg_box_avl.init(x + w, y, w, h, s)
    p.ekg_box_v2.init(x + 2 * w, y, w, h, s)
    p.ekg_box_v5.init(x + 3 * w, y, w, h, s)
    y -= h
    p.ekg_box_1.init(x, y, w, h, s)
    p.ekg_box_avr.init(x + w, y, w, h, s)
    p.ekg_box_v1.init(x + 2 * w, y, w, h, s)
    p.ekg_box_v4.init(x + 3 * w, y, w, h, s)
    y -= h
    p.ekg_box_main.init(x, y, w * 4, h, s)
    p.ekg_box_main.lead = p.ekg_box_2.lead
    p.ekg_box_main.name = p.ekg_box_2.name
    obj.instantiate('ekg_box', p.ekg_box_main)
    obj.instantiate('ekg_box', p.ekg_box_1)
    obj.instantiate('ekg_box', p.ekg_box_2)
    obj.instantiate('ekg_box', p.ekg_box_3)
    obj.instantiate('ekg_box', p.ekg_box_avr)
    obj.instantiate('ekg_box', p.ekg_box_avl)
    obj.instantiate('ekg_box', p.ekg_box_avf)
    obj.instantiate('ekg_box', p.ekg_box_v1)
    obj.instantiate('ekg_box', p.ekg_box_v2)
    obj.instantiate('ekg_box', p.ekg_box_v3)
    obj.instantiate('ekg_box', p.ekg_box_v4)
    obj.instantiate('ekg_box', p.ekg_box_v5)
    obj.instantiate('ekg_box', p.ekg_box_v6)
}

scene_playground.update = () => {
    scene_playground.props.main_box_selection_logic()
}

scene_playground.render = () => {
}

scene_playground.render_ui = () => {
    scene_playground.props.main_box_selection_render()
}
