export class AppSettings {
  //local settings    
  //public static API_ENDPOINT = "https://localhost:8443/couponzcorner/api";

  // aws t2.medium settings
  public static API_ENDPOINT = "https://api.saveji.com/couponzcorner/couponzcorner/api";
  public static USER_LOGIN_API = "http://3.109.223.32:8081/v1/user/login";
  //public static USER_LOGIN_API = "http://localhost:8081/cloudiot/api/v1/user/login";

  public static CURRENT_USER_NAME = "currentUserName";
  public static TOKEN = "token";
  public static env = "LOCAL"; // (or) SERVER
  public static SERVER_DOMAIN = "saveji.com"
}