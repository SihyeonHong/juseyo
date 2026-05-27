/** 마켓 프로필 정보 */
export interface Market {
  userId: string;
  marketName: string; /** 빈 문자열 및 공백만으로 구성된 값 불가 */
  description: string;
  profileImg: string | null;
}
