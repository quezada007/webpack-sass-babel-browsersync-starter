/**
 * SayHelloModule
 *
 * This is a simple sample module using export
 */
export const SayHelloModule = {

    /**
     * Say hello to a given person's name
     *
     * @param name string A person's name
     */
    sayHello(name = 'Jose') {
        console.log(`Hello ${name}`);
    }
};