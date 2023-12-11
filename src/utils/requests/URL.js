import Settings from "../../Settings";

export function absolute(relative) {
  return Settings.SERVER_URL + Settings.API_VERSION_URL + relative;
}
