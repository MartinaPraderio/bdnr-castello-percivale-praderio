import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ActivityLogRequest {
  @IsNotEmpty({ message: 'user_id_cannot_be_empty' })
  @IsDefined({ message: 'user_id_is_required' })
  user_id: string;

  @IsNotEmpty({ message: 'game_id_cannot_be_empty' })
  @IsDefined({ message: 'user_id_is_required' })
  game_id: string;

  @IsArray({ message: 'achievements_must_be_an_array' })
  @IsString({
    each: true,
    message: 'each_element_of_achievements_must_be_a_string',
  })
  @IsNotEmpty({ each: true, message: 'achievements_cannot_be_empty' })
  @IsDefined({ message: 'achievements_is_required' })
  achievements: string[];

  @IsArray({ message: 'levels_unlocked_must_be_an_array' })
  @IsDefined({ message: 'levels_unlocked_is_required' })
  @IsString({
    each: true,
    message: 'each_element_of_levels_unlocked_must_be_a_string',
  })
  @IsNotEmpty({ each: true, message: 'levels_unlocked_cannot_be_empty' })
  @IsDefined({ message: 'levels_unlocked_is_required' })
  levels_unlocked: string[];

  @IsNumber({}, { message: 'play_time_must_be_a_number' })
  @IsDefined({ message: 'play_time_unlocked_is_required' })
  @IsNotEmpty({ message: 'play_time_is_required' })
  play_time: number;

  @IsObject({ message: 'extra_data_must_be_an_object' })
  @ValidateNested({ each: true })
  extra_data: { [key: string]: string };
}
