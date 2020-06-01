import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const excludeUrl = '/signup';
        let xhr;
        if (req.url.search(excludeUrl) === -1) {
            xhr = req.clone({
                headers: req.headers.set('authorization', 'Basic ' + sessionStorage.getItem('auth'))
            });
        }
        return next.handle(xhr);
    }
}
