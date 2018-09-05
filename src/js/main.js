// Compile all the sass files
import '../scss/main.scss';
// Import SayHelloModule
import { SayHelloModule } from "./modules/SayHelloModule";

$(document).ready(function() {
    SayHelloModule.sayHello();
});