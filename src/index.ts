import App from "./app";

const app = new App();
app.initializeMiddleware();
app.initializeControllers();
app.initializeErrorMiddleware();

app.listen();

export default app;
