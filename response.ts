import { Format } from './format';

export class ResponseYT {
    url = '';
    quality: string[] = [];
    subtitle = '';
    title = '';
    description = '';
    thumbnails = '';
    duration = 0;
    preview = '';
    audioOnly = false;
    responseTime = 0;
    needProxy = true;
    isProtected = false;
    status = true;
    format: Format[] = [];

    static GetObj(resp: ResponseYT): ResponseYT {
        let _r = new ResponseYT();
        _r.url = resp.url;
        _r.quality = resp.quality;
        _r.subtitle = resp.subtitle;
        _r.title = resp.title;
        _r.description = resp.description;
        _r.thumbnails = resp.thumbnails;
        _r.duration = resp.duration;
        _r.preview = resp.preview;
        _r.audioOnly = resp.audioOnly;
        _r.responseTime = resp.responseTime;
        _r.needProxy = resp.needProxy;
        _r.isProtected = resp.isProtected;
        _r.status = resp.status;
        _r.format = [];
        for (let i = 0; i < resp.format.length; i++) {
            _r.format.push(Format.GetObj(resp.format[i]));
        }

        return _r;
    }
}
