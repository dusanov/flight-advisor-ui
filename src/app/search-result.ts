import { SearchResultItem } from './search-result-item'

export interface SearchResult {

    description: string,
	totalLength; number,
	totalPrice: number,
	routes: Array<SearchResultItem>,
	geoJson:  {[key: string]: any}//Map<String,Object>

}
