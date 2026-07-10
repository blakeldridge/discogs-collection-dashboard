export namespace main {
	
	export class AddToCollectionResponse {
	    instance_id: number;
	    resource_url: string;
	
	    static createFrom(source: any = {}) {
	        return new AddToCollectionResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.instance_id = source["instance_id"];
	        this.resource_url = source["resource_url"];
	    }
	}
	export class ArtistItem {
	    id: number;
	    name: string;
	    join: string;
	    resource_url: string;
	    anv: string;
	    tracks: string;
	    role: string;
	
	    static createFrom(source: any = {}) {
	        return new ArtistItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.join = source["join"];
	        this.resource_url = source["resource_url"];
	        this.anv = source["anv"];
	        this.tracks = source["tracks"];
	        this.role = source["role"];
	    }
	}
	export class LabelItem {
	    resource_url: string;
	    entity_type: string;
	    catno: string;
	    id: number;
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new LabelItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.resource_url = source["resource_url"];
	        this.entity_type = source["entity_type"];
	        this.catno = source["catno"];
	        this.id = source["id"];
	        this.name = source["name"];
	    }
	}
	export class FormatItem {
	    qty: string;
	    descriptions: string[];
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new FormatItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.qty = source["qty"];
	        this.descriptions = source["descriptions"];
	        this.name = source["name"];
	    }
	}
	export class BasicInfo {
	    id: number;
	    title: string;
	    year: number;
	    resource_url: string;
	    thumb: string;
	    cover_image: string;
	    formats: FormatItem[];
	    labels: LabelItem[];
	    artists: ArtistItem[];
	    genres: string[];
	    styles: string[];
	
	    static createFrom(source: any = {}) {
	        return new BasicInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.year = source["year"];
	        this.resource_url = source["resource_url"];
	        this.thumb = source["thumb"];
	        this.cover_image = source["cover_image"];
	        this.formats = this.convertValues(source["formats"], FormatItem);
	        this.labels = this.convertValues(source["labels"], LabelItem);
	        this.artists = this.convertValues(source["artists"], ArtistItem);
	        this.genres = source["genres"];
	        this.styles = source["styles"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class AddToWantlistResponse {
	    id: number;
	    rating: number;
	    notes: string;
	    resource_url: string;
	    basic_information: BasicInfo;
	
	    static createFrom(source: any = {}) {
	        return new AddToWantlistResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.rating = source["rating"];
	        this.notes = source["notes"];
	        this.resource_url = source["resource_url"];
	        this.basic_information = this.convertValues(source["basic_information"], BasicInfo);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class CollectionNote {
	    field_id: number;
	    value: string;
	
	    static createFrom(source: any = {}) {
	        return new CollectionNote(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.field_id = source["field_id"];
	        this.value = source["value"];
	    }
	}
	export class CollectionItem {
	    id: number;
	    instance_id: number;
	    folder_id: number;
	    rating: number;
	    basic_information: BasicInfo;
	    notes: CollectionNote[];
	
	    static createFrom(source: any = {}) {
	        return new CollectionItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.instance_id = source["instance_id"];
	        this.folder_id = source["folder_id"];
	        this.rating = source["rating"];
	        this.basic_information = this.convertValues(source["basic_information"], BasicInfo);
	        this.notes = this.convertValues(source["notes"], CollectionNote);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class CommunityStats {
	    want: number;
	    have: number;
	
	    static createFrom(source: any = {}) {
	        return new CommunityStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.want = source["want"];
	        this.have = source["have"];
	    }
	}
	
	
	export class SearchParams {
	    query: string;
	    artist: string;
	    release_title: string;
	    format: string;
	    year: string;
	
	    static createFrom(source: any = {}) {
	        return new SearchParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.query = source["query"];
	        this.artist = source["artist"];
	        this.release_title = source["release_title"];
	        this.format = source["format"];
	        this.year = source["year"];
	    }
	}
	export class SearchResult {
	    id: number;
	    type: string;
	    title: string;
	    year: string;
	    country: string;
	    thumb: string;
	    uri: string;
	    resource_url: string;
	    catno: string;
	    genre: string[];
	    style: string[];
	    format: string[];
	    label: string[];
	    community: CommunityStats;
	
	    static createFrom(source: any = {}) {
	        return new SearchResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.type = source["type"];
	        this.title = source["title"];
	        this.year = source["year"];
	        this.country = source["country"];
	        this.thumb = source["thumb"];
	        this.uri = source["uri"];
	        this.resource_url = source["resource_url"];
	        this.catno = source["catno"];
	        this.genre = source["genre"];
	        this.style = source["style"];
	        this.format = source["format"];
	        this.label = source["label"];
	        this.community = this.convertValues(source["community"], CommunityStats);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class WantlistItem {
	    rating: number;
	    basic_information: BasicInfo;
	    id: number;
	    resrouce_url: number;
	
	    static createFrom(source: any = {}) {
	        return new WantlistItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.rating = source["rating"];
	        this.basic_information = this.convertValues(source["basic_information"], BasicInfo);
	        this.id = source["id"];
	        this.resrouce_url = source["resrouce_url"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

