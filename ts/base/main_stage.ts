const main_stage = {
    get_list() {
        return dom.qa('.main-stage')
    },
    unhide(el: Element) {
        dom.remove_class(el, 'hidden')
    },
    hide_all() {
        this.get_list().forEach(el => dom.add_class(el, 'hidden'))
    },
    change(el: Element) {
        this.hide_all()
        this.unhide(el)
    }
}

events.on('core_scene_change_scene', ev => {
    switch (ev.current_scene) {
        case scene_login:
            main_stage.change(dom.q('.main-stage#stage-login')!)
            break
        case scene_loading:
            main_stage.change(stage.canvas)
            break
        case scene_playground:
            main_stage.change(stage.canvas)
            break
        default:
            break
    }
})
