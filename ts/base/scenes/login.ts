interface SceneLoginProps {
    login_button: HTMLDivElement
    view_all_button: HTMLDivElement
}

const scene_login = new CoreScene<SceneLoginProps>('Login', {
    login_button: dom.q('.login-button')!,
    view_all_button: dom.q('.view-all-button')!,
})

scene_login.props.login_button.onclick = () => {
    scene.change_scene(scene_loading)
}

scene_login.props.view_all_button.onclick = () => {
    window.location.href = '../'
}
