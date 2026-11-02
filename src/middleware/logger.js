export function logger(req, res, next) {
    // Record request details for debugging and monitoring purposes.
    console.log(`[${new Date().toISOString()}] ${req.method} request targeting path: ${req.path}`);
    
    // Proceed to the next middleware or route handler in the stack.
    next ();
}