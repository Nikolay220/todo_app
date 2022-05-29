export default class LocalStorageService {
  static setGuestLocalId(guestLocalId) {
    localStorage.setItem('guestLocalId', guestLocalId)
  }
  static getGuestLocalId() {
    return localStorage.getItem('guestLocalId')
  }
  static clearStorage() {
    localStorage.clear()
  }
}
