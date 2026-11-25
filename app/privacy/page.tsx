import type { Metadata } from 'next';
import { PageIntro } from '../../components/ui';
import { advisor } from '../../lib/content';

export const metadata: Metadata = { title: 'Privacy information' };

export default function Privacy() {
  return (
    <>
      <PageIntro title="Privacy information" meta="Design preview" />
      <div className="shell section section--flush-top">
        <div className="prose legal">
          <h2>Your saved preferences</h2>
          <p>
            The property references you save and the answers in your move plan are stored in this browser. They are not
            sent to Cintia automatically. Remove saved properties, reset your plan, or clear browser site data to delete
            those preferences.
          </p>
          <h2>Making contact</h2>
          <p>
            Your name, email, phone, and inquiry notes are kept in the open form and are not saved to local storage. In
            preview mode, preparing an inquiry creates text for your own email app or clipboard; nothing is sent
            automatically. When an operator configures online delivery, the form clearly offers “Send my inquiry,” and
            your submitted details are sent through the configured email service to the advisor’s inbox.
          </p>
          <h2>Service providers</h2>
          <p>
            The optional server implementation uses Resend for inquiry delivery. The host and mail provider may process
            ordinary access, security, and delivery logs according to their policies. This concept includes no
            advertising analytics or marketing subscription tools.
          </p>
          <h2>Keep sensitive details out of the form</h2>
          <p>
            Please do not send identity documents, banking details, financial records, or account credentials through
            this general inquiry form. Discuss an appropriate channel with your advisor if documents are needed later.
          </p>
          <h2>Questions or changes</h2>
          <p>
            For questions about information you have chosen to send to Cintia, contact{' '}
            <a href={`mailto:${advisor.email}`}>{advisor.email}</a>. This draft privacy information describes the
            concept’s behavior and should be reviewed against the final production setup before public launch.
          </p>
        </div>
      </div>
    </>
  );
}
