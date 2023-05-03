interface SceneLoginProps {
    login_button: HTMLDivElement
}

const scene_login = new CoreScene<SceneLoginProps>('Login', {
    login_button: dom.q('.login-button')!,
})

scene_login.props.login_button.onclick = () => {
    scene.change_scene(scene_loading)
}
