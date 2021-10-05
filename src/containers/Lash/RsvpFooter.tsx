type Props = {
  toggleInfo: () => void;
  toggleRsvp: () => void;
};
export default function RsvpFooter({ toggleRsvp, toggleInfo }: Props) {
  return (
    <div className="rsvp__footer">
      <div className="info__button" onClick={toggleInfo}>
        INFO
      </div>
      <div className="rsvp__button" onClick={toggleRsvp}>
        RSVP
      </div>
    </div>
  );
}
