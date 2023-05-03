class CoreVec2 {
    x: number
    y: number
    constructor(v?: CoreVec2)
    constructor(x?: number, y?: number)
    constructor(x: CoreVec2 | number = 0, y: number = 0) {
        if (x instanceof CoreVec2) {
            this.x = x.x
            this.y = x.y
        }
        else {
            this.x = x
            this.y = y
        }
        return this
    }
    clone(): CoreVec2 {
        return new CoreVec2(this.x, this.y)
    }
    set(v: CoreVec2): CoreVec2
    set(x: number, y: number): CoreVec2
    set(x: CoreVec2 | number, y?: number): CoreVec2 {
        if (x instanceof CoreVec2) {
            this.x = x.x
            this.y = x.y
        }
        else {
            this.x = x
            this.y = y!
        }
        return this
    }
    set_length(length: number): CoreVec2 {
        const angle_rad = this.get_angle()
        this.x = Math.cos(angle_rad) * length
        this.y = Math.sin(angle_rad) * length
        return this
    }
    get_length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    set_angle(angle_rad: number): CoreVec2 {
        const length = this.get_length()
        this.x = Math.cos(angle_rad) * length
        this.y = Math.sin(angle_rad) * length
        return this
    }
    get_angle(): number {
        return Math.atan2(this.y, this.x)
    }
    set_angle_deg(angle_deg: number): CoreVec2 {
        this.set_angle(angle_deg * G_CORE_MATH_DEG_TO_RAD)
        return this
    }
    get_angle_deg(): number {
        return this.get_angle() * G_CORE_MATH_RAD_TO_DEG
    }
    add(v: CoreVec2): CoreVec2
    add(x: number, y: number): CoreVec2
    add(x: CoreVec2 | number, y?: number): CoreVec2 {
        if (x instanceof CoreVec2) {
            this.x += x.x
            this.y += x.y
        }
        else {
            this.x += x
            this.y += y!
        }
        return this
    }
    subtract(v: CoreVec2): CoreVec2
    subtract(x: number, y: number): CoreVec2
    subtract(x: CoreVec2 | number, y?: number): CoreVec2 {
        if (x instanceof CoreVec2) {
            this.x -= x.x
            this.y -= x.y
        }
        else {
            this.x -= x
            this.y -= y!
        }
        return this
    }
    multiply(v: CoreVec2): CoreVec2
    multiply(x: number, y: number): CoreVec2
    multiply(x: CoreVec2 | number, y?: number): CoreVec2 {
        if (x instanceof CoreVec2) {
            this.x *= x.x
            this.y *= x.y
        }
        else {
            this.x *= x
            this.y *= y!
        }
        return this
    }
    divide(v: CoreVec2): CoreVec2
    divide(x: number, y: number): CoreVec2
    divide(x: CoreVec2 | number, y?: number): CoreVec2 {
        if (x instanceof CoreVec2) {
            this.x /= x.x
            this.y /= x.y
        }
        else {
            this.x /= x
            this.y /= y!
        }
        return this
    }
    to_text(): string {
        return `x: ${this.x}, y: ${this.y}`
    }
    static get one() {
        return new CoreVec2(1, 1)
    }
    static create(v: CoreVec2): CoreVec2
    static create(x: number, y: number): CoreVec2
    static create(x: CoreVec2 | number, y?: number): CoreVec2 {
        if (x instanceof CoreVec2) return new CoreVec2(x.x, x.y)
        else return new CoreVec2(x, y!)
    }
    static polar(length: number, angle_rad: number): CoreVec2 {
        const v = new CoreVec2()
        v.set_length(length)
        v.set_angle(angle_rad)
        return v
    }
    static polar_deg(length: number, angle_deg: number): CoreVec2 {
        const v = new CoreVec2()
        v.set_length(length)
        v.set_angle_deg(angle_deg)
        return v
    }
}
