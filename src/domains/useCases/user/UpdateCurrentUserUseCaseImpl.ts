import { s3Repository, userRepository } from '@adapter/repositories';
import { UpdateAccountFormData, User } from '@domain/entities/User';
import { UpdateCurrentUserUseCase } from '@domain/useCases/interfaces/user/UpdateCurrentUserUseCase';

export default class UpdateCurrentUserUseCaseImpl implements UpdateCurrentUserUseCase {
  invoke = async (
    formData: UpdateAccountFormData,
  ) : Promise<User> => {
    const {
      email, phoneNumber, firstName, lastName, address, birthday, sex, attachment,
    } = formData;
    let { avatar } = formData;
    if (attachment[0]) {
      const presignedUrl = await s3Repository.uploadAvatarAttachmentViaPresignedURL(attachment[0]);
      avatar = presignedUrl.url;
    }
    return userRepository.updateCurrentUser({
      email,
      phoneNumber,
      firstName,
      lastName,
      address,
      birthday,
      sex,
      avatar,
    } as UpdateAccountFormData);
  }
}
