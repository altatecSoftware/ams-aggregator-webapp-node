
import mongoose from "mongoose";

export default class MongoDB {
    private _conn: string

    constructor({ config }: any) {
        this._conn = config.MONGODB_CONNECTION
    }

    public connection() {
        mongoose.set("strictQuery", true)
        mongoose.connect(this._conn).then(() => { console.log("MongoDB connected successfully") }).
            catch(err => { console.log(err) })
    }
}