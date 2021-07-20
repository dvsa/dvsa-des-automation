/**
 * Switch to the NATIVE / WEB Context
 * @param  {String}   mode Context selector
 */
export default (
    mode: 'native' | 'web',
) => {

    const contexts = driver.getContexts();

    // console.log('Available contexts', contexts);

    if (mode == 'native') {
        // Switch to native
        driver.switchContext('NATIVE_APP');
    }
    else {
        // Switch to web
        driver.switchContext(contexts[1]);
    }

};
