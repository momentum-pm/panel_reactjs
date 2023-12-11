import "./ModalRouter.scss";
import React, { Component, lazy, Suspense } from "react";
import History from "../../History";
import { Route, Switch } from "react-router";
import LoadingView from "../base/refactored/loadingView/LoadingView";
import ConfirmModal from "../../views/base/ConfirmModal";
import ChoiceSelectorModal from "../../views/base/ChoiceSelectorModal";

const ExperienceEditFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/userProfileEdit/experiences/ExperienceEditFormView"
  )
);
const ExperienceCreateFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/userProfileEdit/experiences/ExperienceCreateFormView"
  )
);
const EducationEditFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/userProfileEdit/educations/EducationEditFormView"
  )
);
const EducationCreateFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/userProfileEdit/educations/EducationCreateFormView"
  )
);
const CertificateEditFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/userProfileEdit/certificates/CertificateEditFormView"
  )
);
const CertificateCreateFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/userProfileEdit/certificates/CertificateCreateFormView"
  )
);
const SampleCreateFormView = lazy(() =>
  import("../app/profiles/views/profileEdit/samples/SampleCreateFormView")
);
const CollectionCreateFormView = lazy(() =>
  import("../app/profiles/views/profileEdit/samples/CollectionCreateFormView")
);
const CollectionModal = lazy(() =>
  import("../app/profiles/views/profileVisit/samples/CollectionModal")
);
const CollectionEditFormView = lazy(() =>
  import("../app/profiles/views/profileEdit/samples/CollectionEditFormView")
);
const AccountLinkEditFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/accountLinks/AccountLinkEditFormView"
  )
);
const AccountLinkCreateFormView = lazy(() =>
  import(
    "../app/profiles/views/profileEdit/accountLinks/AccountLinkCreateFormView"
  )
);
const PhoneNumberUpdateFormView = lazy(() =>
  import("../app/profiles/views/PhoneNumberUpdateFormView")
);
const PhoneNumberVerificationFormView = lazy(() =>
  import("../app/profiles/views/PhoneNumberVerificationFormView")
);
const EmailVerificationFormView = lazy(() =>
  import("../app/profiles/views/EmailVerificationFormView")
);
const WithdrawCreateFormView = lazy(() =>
  import(
    "../app/dashboard/accounting/views/accountingPage/WithdrawCreateFormView"
  )
);
const WalletEditFormView = lazy(() =>
  import("../app/dashboard/accounting/views/accountingPage/WalletEditFormView")
);
const AuthorPostPartCreateModal = lazy(() =>
  import("../app/blog/views/auhorPost/AuthorPostPartCreateModal")
);
const ThreadCreateModal = lazy(() =>
  import("../app/dashboard/chats/views/ThreadCreateModal")
);
const InstantImageModal = lazy(() =>
  import("../base/instantFileIconView/InstantImageModal")
);
const InstantVideoModal = lazy(() =>
  import("../base/instantFileIconView/InstantVideoModal")
);
const SectionCreateModal = lazy(() =>
  import("../app/school/views/author/SectionCreateModal")
);
const CourseChildrenCreateModal = lazy(() =>
  import("../app/school/views/author/CourseChildrenCreateModal")
);
const StudentNumbersModal = lazy(() =>
  import("../app/school/views/author/StudentNumbersModal")
);
const AccessCreateModal = lazy(() =>
  import("../app/school/views/author/AccessCreateModal")
);

const AccessEditModal = lazy(() =>
  import("../app/school/views/author/AccessEditModal")
);

const DiscountCreateModal = lazy(() =>
  import("../app/school/views/author/DiscountCreateModal")
);
const OpenForModal = lazy(() =>
  import("../app/school/views/author/OpenForModal")
);
const SectionEditModal = lazy(() =>
  import("../app/school/views/author/SectionEditModal")
);
const EpisodeCreateModal = lazy(() =>
  import("../app/school/views/author/EpisodeCreateModal")
);
const EpisodeEditModal = lazy(() =>
  import("../app/school/views/author/EpisodeEditModal")
);
const TicketCreateModal = lazy(() =>
  import("../app/dashboard/support/views/TicketCreateModal")
);
const SupportMessageModal = lazy(() =>
  import("../app/dashboard/support/views/MessageCreateResponsiveFormView")
);
const CourseEditModal = lazy(() =>
  import("../app/school/views/author/CourseEditModal")
);
const ExerciseAnswerModal = lazy(() =>
  import("../app/school/views/ExerciseAnswerModal")
);
const ExerciseHintModal = lazy(() =>
  import("../app/school/views/ExerciseHintModal")
);

class ModalRouter extends Component {
  constructor(props) {
    super(props);
    this.get_modal_location = this.get_modal_location.bind(this);
    this.check_key = this.check_key.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.check_key, false);
  }

  check_key(event) {
    if (event.key === "Escape" && this.get_modal_location()) {
      History.goBack();
    }
  }

  get_modal_location() {
    return History.location.state && History.location.state.modal_location;
  }

  render() {
    let modal_location = this.get_modal_location();
    if (modal_location) {
      return (
        <div className={`modal-router ${modal_location.size}`}>
          <div className={"modal-router-background"} onClick={History.goBack} />
          <div
            className={`modal-router-modal modal-router-modal-${modal_location.size}`}
          >
            <div className={"modal-container"}>
              <Suspense fallback={<LoadingView />}>
                <Switch location={modal_location}>
                  <Route path={"confirm/"} render={() => <ConfirmModal />} />
                  <Route
                    path={"choice-select/"}
                    render={() => <ChoiceSelectorModal />}
                  />
                  <Route
                    path={
                      "/profiles/profiles/:profileId/experiences/:experienceId/edit/"
                    }
                    render={() => <ExperienceEditFormView />}
                  />
                  <Route
                    path={"/profiles/profiles/:profileId/experiences/create/"}
                    render={() => <ExperienceCreateFormView />}
                  />
                  <Route
                    path={
                      "/profiles/profiles/:profileId/educations/:educationId/edit/"
                    }
                    render={() => <EducationEditFormView />}
                  />
                  <Route
                    path={"/profiles/profiles/:profileId/educations/create/"}
                    render={() => <EducationCreateFormView />}
                  />
                  <Route
                    path={"/threads/create/:member"}
                    render={() => <ThreadCreateModal />}
                  />
                  <Route
                    path={
                      "/profiles/profiles/:profileId/certificates/:certificateId/edit/"
                    }
                    render={() => <CertificateEditFormView />}
                  />
                  <Route
                    path={"/profiles/profiles/:profileId/certificates/create/"}
                    render={() => <CertificateCreateFormView />}
                  />
                  <Route
                    path={"/profiles/profiles/:profileId/samples/create/"}
                    render={() => <SampleCreateFormView />}
                  />
                  <Route
                    path={"/profiles/profiles/:profileId/collections/create/"}
                    render={() => <CollectionCreateFormView />}
                  />
                  <Route
                    path={
                      "/profiles/profiles/:profileId/collections/:collectionId/edit/"
                    }
                    render={() => <CollectionEditFormView />}
                  />
                  <Route
                    path={
                      "/profiles/profiles/:profileId/collections/:collectionId/"
                    }
                    render={() => <CollectionModal />}
                  />
                  <Route
                    path={
                      "/profiles/profiles/:profileId/account-links/:accountLinkId/edit/"
                    }
                    render={() => <AccountLinkEditFormView />}
                  />
                  <Route
                    path={"/profiles/profiles/:profileId/account-links/create/"}
                    render={() => <AccountLinkCreateFormView />}
                  />
                  <Route
                    path={"/profiles/update/phone-number/"}
                    render={() => <PhoneNumberUpdateFormView />}
                  />
                  <Route
                    path={"/profiles/verify-phone-number/"}
                    render={() => <PhoneNumberVerificationFormView />}
                  />
                  <Route
                    path={"/profiles/verify-email/"}
                    render={() => <EmailVerificationFormView />}
                  />
                  <Route
                    path={"/dashboard/accounting/withdraw/"}
                    render={() => <WithdrawCreateFormView />}
                  />
                  <Route
                    path={"/dashboard/accounting/wallet-edit/"}
                    render={() => <WalletEditFormView />}
                  />
                  <Route
                    path={"/blog/authors/:authorId/posts/:postId/parts/create/"}
                    render={() => <AuthorPostPartCreateModal />}
                  />
                  <Route
                    path={`/instant-image/`}
                    render={() => <InstantImageModal />}
                  />
                  <Route
                    path={`/instant-video/`}
                    render={() => <InstantVideoModal />}
                  />

                  <Route
                    path={"/school/authors/:authorId/courses/:courseId/edit/"}
                    render={() => <CourseEditModal />}
                  />
                  <Route
                    path={"/school/exercises/:exerciseId/answer/"}
                    render={() => <ExerciseAnswerModal />}
                  />
                  <Route
                    path={"/school/exercises/:exerciseId/hint/"}
                    render={() => <ExerciseHintModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/sections/:sectionId/episodes/create/"
                    }
                    render={() => <EpisodeCreateModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/sections/:sectionId/episodes/:episodeId/edit/"
                    }
                    render={() => <EpisodeEditModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/sections/create/"
                    }
                    render={() => <SectionCreateModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/create-children/"
                    }
                    render={() => <CourseChildrenCreateModal />}
                  />
                  <Route
                    path={"/school/numbers/"}
                    render={() => <StudentNumbersModal />}
                  />

                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/accesses/create/:role/"
                    }
                    render={() => <AccessCreateModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/accesses/:accessId/edit/"
                    }
                    render={() => <AccessEditModal />}
                  />

                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/discounts/"
                    }
                    render={() => <DiscountCreateModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/sections/:parentId/subsections/create/"
                    }
                    render={() => <SectionCreateModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/open-for/"
                    }
                    render={() => <OpenForModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/sections/:parentId/subsections/:sectionId/edit/"
                    }
                    render={() => <SectionEditModal />}
                  />
                  <Route
                    path={
                      "/school/authors/:authorId/courses/:courseId/sections/:sectionId/edit/"
                    }
                    render={() => <SectionEditModal />}
                  />

                  <Route
                    path={`/dashboard/support/create/`}
                    render={() => <TicketCreateModal />}
                  />
                  <Route
                    path={`/dashboard/support/tickets/:ticketId/message/`}
                    render={() => <SupportMessageModal />}
                  />
                </Switch>
              </Suspense>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ModalRouter;
