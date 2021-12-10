// eslint-disable-next-line max-classes-per-file
import { Record, List } from 'immutable';

/**
 * GenreItemModel
 * id: Number
 * name" String
 */

class VideoModel extends Record({
  id: null,
  iso_639_1: null,
  iso_3166_1: null,
  key: null,
  name: null,
  site: 'YouTube',
  size: 0,
  type: null
}) {
  get language() {
    const language = this.get('iso_639_1');

    return language.toUpperCase();
  }
}
/**
 * MovieListModel
 * id: Number
 * genres: List
 */

export class VideosModel extends Record({
  id: 0,
  results: List()
}, 'GenresModel') {
  constructor(values) {
    super(values);

    return this
      .set('results', this.populateResults());
  }

  populateResults() {
    const videos = this.get('results');

    if (videos.length) {
      return List(videos.map((video) => new VideoModel(video)));
    }

    return List();
  }

  getVideos() {
    return this.get('results');
  }
}
