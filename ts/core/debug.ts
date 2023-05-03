interface CoreDebug {
    debug_index: number
    odd(): boolean
    draw_fps(x: number, y: number): void
}

core.debug = {
    debug_index: 0,
    odd() {
        return this.debug_index % 2 !== 0
    },
    draw_fps(x, y) {
        const t = `${Math.round(core.time.fps)}`

        core.draw.set_font(font.s)
        const tw = core.draw.get_text_width(t)
        const th = core.draw.get_text_height(t)

        core.draw.set_alpha(0.5)

        core.draw.set_color('#000')
        core.draw.rect(0, 0, tw, th)

        core.draw.set_hvalign('left', 'top')
        core.draw.set_color('#fff')
        core.draw.text(x, y, t)

        core.draw.reset_alpha()
    },
}

window.addEventListener('keydown', ev => {
    if (ev.ctrlKey && ev.shiftKey && ev.code === G_DEBUG_KEYCODE) {
        core.debug.debug_index = ++core.debug.debug_index % G_DEBUG_INDEX_AMOUNT
    }
})
