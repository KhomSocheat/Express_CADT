import { createClient } from "redis";

const redisClient = createClient({
    url : `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})

redisClient.on("ready", () => {
    console.log("Redis is ready ✅");
});

redisClient.on('error' , (err) => {
    console.log('Redis client error: ', err)
})
export const connectRedis = async () =>{
    if(!redisClient.isOpen){
        await redisClient.connect();
    }
}
export default redisClient;