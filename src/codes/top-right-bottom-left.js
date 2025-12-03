export const basicCode = `<!-- top left corner -->
<div position="relative" size="30">
  <div position="absolute" top="0" left="0" size="16">01</div>
</div>
<!-- top edge -->
<div position="relative" size="30">
  <div position="absolute" top="0" inset-x="0" h="16">02</div>
</div>
<!-- top right corner -->
<div position="relative" size="30">
  <div position="absolute" top="0" right="0" size="16">03</div>
</div>
<!-- left edge -->
<div position="relative" size="30">
  <div position="absolute" left="0" inset-y="0" w="16">04</div>
</div>
<!-- fill entire parent -->
<div position="relative" size="30">
  <div position="absolute" inset="0">05</div>
</div>
<!-- right edge -->
<div position="relative" size="30">
  <div position="absolute" right="0" inset-y="0" w="16">06</div>
</div>
<!-- bottom left corner -->
<div position="relative" size="30">
  <div position="absolute" left="0" bottom="0" size="16">07</div>
</div>
<!-- bottom edge -->
<div position="relative" size="30">
  <div position="absolute" inset-x="0" bottom="0" h="16">08</div>
</div>
<!-- bottom right corner -->
<div position="relative" size="30">
  <div position="absolute" right="0" bottom="0" size="16">09</div>
</div>`;

export const negativeCode = `<div position="relative" size="30">
  <div size="10" position="absolute" top="-3" left="-3"></div>
</div>`;

export const logicalCode = `<div dir="ltl" size="30" position="relative">
  <div size="14" position="absolute" start="0" top="0"></div>
</div>
<div dir="rtl" size="30" position="relative">
  <div size="14" position="absolute" start="0" top="0"></div>
</div>`;
