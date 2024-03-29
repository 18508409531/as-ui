import { defineComponent, createVNode, renderSlot, h } from 'vue';
import { useNamespace } from '../../../utils/bem.mjs';
import { useSameTarget } from './utils.mjs';

const definePropType = (val) => val;
const overlayProps = {
  mask: {
    type: Boolean,
    default: true
  },
  customMaskEvent: {
    type: Boolean,
    default: false
  },
  overlayClass: {
    type: definePropType([
      String,
      Array,
      Object
    ])
  },
  zIndex: {
    type: definePropType([String, Number])
  }
};
const overlayEmits = {
  click: (evt) => evt instanceof MouseEvent
};
var Overlay = defineComponent({
  name: "AsOverlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace("overlay");
    const onMaskClick = (e) => {
      emit("click", e);
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(
      props.customMaskEvent ? void 0 : onMaskClick
    );
    return () => {
      return props.mask ? createVNode(
        "div",
        {
          class: [ns.b(), props.overlayClass],
          style: {
            zIndex: props.zIndex
          },
          onClick,
          onMousedown,
          onMouseup
        },
        [renderSlot(slots, "default")],
        4 | 2 | 8,
        ["onClick", "onMouseup", "onMousedown"]
      ) : h(
        "div",
        {
          class: props.overlayClass,
          style: {
            zIndex: props.zIndex,
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px"
          }
        },
        [renderSlot(slots, "default")]
      );
    };
  }
});

export { Overlay as default, definePropType, overlayEmits, overlayProps };
//# sourceMappingURL=overlay.mjs.map
