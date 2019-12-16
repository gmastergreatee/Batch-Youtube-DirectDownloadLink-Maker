export class Format {
    id: number;
    height: number;
    width: number;
    size: number;
    ext: string;
    url: string;

    static GetObj(format: Format): Format {
        let _f = new Format();
        _f.id = format.id;
        _f.height = format.height;
        _f.width = format.width;
        _f.size = format.size;
        _f.ext = format.ext;
        _f.url = format.url;
        return _f;
    }
}
