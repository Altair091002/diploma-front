import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Category} from "../../../../modules/apps/academy/academy.types";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    private categoryUrl ='http://localhost:8081/fizmath/academy/api/apps/category';
    constructor(private httpClient: HttpClient) { }

    getCategories():Observable<Category[]> {
        return this.httpClient.get<any>(this.categoryUrl).pipe(
            map(response => response)
        );
    }
}
