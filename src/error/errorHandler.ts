process.on("unhandledRejection", (reason, promise) => {
    console.error("💥 Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("💥 Uncaught Exception:", err);
});
