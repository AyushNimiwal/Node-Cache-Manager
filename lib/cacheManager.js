class CacheManager {
    constructor(ttl = 60) {
        this.cache = new Map();
        this.ttl = ttl*1000;
    }
    _isExpired(item) {
        return Date.now() > item.expiry;
    }

    set(key, value,ttl = this.ttl){
        const expiry = Date.now() + ttl;
        this.cache.set(key,{value,expiry});
    }

    get(key) {
        const item = this.cache.get(key);
        if(!item)return null;
        if(this._isExpired(item)) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }
    delete(key) {
        return this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    keys(){
        return [...this.cache.keys];
    }
    has(key) {
        const item = this.cache.get(key);
        if(!item) return false;

        if(this._isExpired(item)){
            this.cache.delete(key);
            return false;
        }
        return true;
    }
    size() {
        return this.cache.size();
    }
    
}

module.exports = CacheManager;