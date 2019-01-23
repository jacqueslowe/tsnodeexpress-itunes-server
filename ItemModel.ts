export class ItemModel {
    artistName: string;
    trackName: string;
    genre: string;
    artworkUrl30: string;
    artworkUrl100: string;
    previewUrl: string;
    constructor(
        ArtistName: string,
        TrackName: string,
        Genre: string,
        ArtworkUrl30: string,
        ArtworkUrl100: string,
        PreviewUrl: string) {
        this.artworkUrl30 = ArtworkUrl30;
        this.artistName = ArtistName;
        this.trackName = TrackName;
        this.genre = Genre;
        this.artworkUrl100 = ArtworkUrl100;
        this.previewUrl = PreviewUrl;
    }
}
export default ItemModel;
