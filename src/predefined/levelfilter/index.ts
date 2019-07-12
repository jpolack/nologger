import { levelWeight, Level } from "../..";

class Levelfilter {
    private level: Level

    public constructor(initialLevel: Level = Level.INFO) {
        this.level = initialLevel

        this.middleware = this.middleware.bind(this)
    }

    public setLevel(level: Level): void{
        this.level = level
    }

    public getLevel(): Level{
        return this.level
    }

    public middleware(loglevel, messages, next): void {
        if (levelWeight[loglevel] < levelWeight[this.level]){
            return
        }
        next(loglevel, messages)
    }
}

export default Levelfilter
