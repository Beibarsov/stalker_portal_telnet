/**
 * Binding observer.fire to keydown event.
 */
document.addEventListener("keydown", function(event){observer.fire(event)}, false);

/**
 * KeyDown event observer.
 */
var observer = new function(){
    
    this.listeners = {};
    
    this.fire = function(e){
        
        if (stb && stb.key_lock === true){
            _debug('key locked');
            return;
        }
        
        var code = e.keyCode || e.which;
        
        if (e.shiftKey){
            code += 1000;
        }
        
        if (e.altKey){
            code += 2000;
        }
        
        _debug('code:', code);
        
        if (this.listeners.hasOwnProperty(code)){
            for(var i=0; i<this.listeners[code].length; i++){
                
                var item = this.listeners[code][i];
                
                if (item.c.hasOwnProperty('con_menu')){
                    if (item.c.con_menu.on){
                        continue;
                    }
                }
                
                if (item.c.on || item.c === window || item.force){
                    item.f.apply(item.c, item.a);
                    return;
                }
            }
        }
    }
}

/**
 * Binding function to key.
 * @param {number} key
 * @param {Object} context The object to be used as the value of 'this' within 'f'
 * @param {*} args
 * @return {Function}
 */
Function.prototype.bind = function(key, context, args){
    context = context || window;
    observer.listeners[key] = observer.listeners[key] || [];
    args = Array.prototype.splice.apply(arguments, [2, arguments.length]);
    observer.listeners[key].unshift({'f' : this, 'c' : context, 'a' : args});
    return this;
}

Function.prototype.force_bind = function(key, context, args){
    context = context || window;
    observer.listeners[key] = observer.listeners[key] || [];
    args = Array.prototype.splice.apply(arguments, [2, arguments.length]);
    observer.listeners[key].unshift({'f' : this, 'c' : context, 'a' : args, 'force' : true});
    return this;
}