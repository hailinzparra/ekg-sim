const grid_size = 64

const scene_game = new CoreScene()

let selected_node: HeartNode | CoreVec2 | null = null
const selected_node_offset = new CoreVec2()

let sa_node: HeartNode | null = null
let main_lead: HeartNode | null = null

scene_game.start = () => {
    sa_node = obj.instantiate('heart_node', new HeartNode(
        'NSA', stage.mid.w, stage.mid.h, 20,
        CoreVec2.polar(120, 60), '#ffb814'
    ))

    main_lead = obj.instantiate('heart_node', new HeartNode(
        'Lead', stage.mid.w, stage.mid.h, 16,
        CoreVec2.polar(120, 60), '#ba3c84'
    ))
}

scene_game.update = () => {
    // Drag n drop logic
    if (selected_node) {
        // Drag around
        if (input.mouse_hold(0)) {
            selected_node.x = selected_node_offset.x + input.x
            selected_node.y = selected_node_offset.y + input.y
        }
        // Release
        if (input.mouse_up(0)) {
            selected_node = null
        }
    }
    else {
        // Pick node that intersect
        if (input.mouse_down(0)) {
            for (const node of obj.take('heart_node') as HeartNode[]) {
                if (node.intersect_circle(input.x, input.y, 1)) {
                    selected_node = node
                    selected_node_offset.reset()
                    break
                }
                if (node.intersect_vec_polar(input.x, input.y)) {
                    selected_node = node.vec_polar
                    selected_node_offset.set(-node.x, -node.y)
                    break
                }
            }
        }
    }
}

scene_game.render = () => {
    // Grid background
    const grid_column = stage.w / grid_size
    const grid_row = stage.h / grid_size
    draw.ctx.lineWidth = 5
    draw.set_color('#1e1357')
    for (let i = 0; i < grid_column; i++) {
        const x = i * grid_size
        draw.line(x, 0, x, stage.h)
    }
    for (let j = 0; j < grid_row; j++) {
        const y = j * grid_size
        draw.line(0, y, stage.w, y)
    }
}

scene_game.render_ui = () => {
    if (main_lead && sa_node) {
        main_lead.draw_ekg_box(sa_node, stage.w - grid_size * 9.5, stage.mid.h - grid_size * 5, grid_size * 9, grid_size * 10)
    }

    draw_debug()
}
