import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";

const ModalGameConfiguration: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  return (
    <ModalComponent
      title="message_1749392775687"
      open={open}
      size="default"
      isChildren
      {...rest}
    >
      <div className="game-configuration--container"></div>
      <div className="game-configuration--footer"></div>
    </ModalComponent>
  );
};

export default ModalGameConfiguration;
