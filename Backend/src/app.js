const express =require("express");
const app=express();
const authRouter=require("./routes/auth.routes");
const cookieParser=require("cookie-parser");
const cors=require("cors")
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cookieParser());
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS origin denied"));
        }
    },
    credentials: true
}))
app.use(express.json());
app.use("/api/auth", authRouter)


module.exports=app;