import StyledButton from "@/components/kendo/common/StyledButton.tsx";
import StyledCheckbox from "@/components/kendo/common/StyledCheckbox.tsx";
import StyledDropDownList from "@/components/kendo/common/StyledDropDownList.tsx";
import StyledInput from "@/components/kendo/common/StyledInput.tsx";
import StyledPasswordInput from "@/components/kendo/common/StyledPasswordInput.tsx";
import styled from "styled-components";

function CommonSample() {
  const categories = ["Pizza", "Burger", "Pasta", "Burrito"];

  const CustomInput = styled(StyledPasswordInput)`
    width: 400px;
  `;

  return (
    <div>
      <div>
        <p> 1. Button</p>
        <StyledButton cssType="main_01"> Main 1번 버튼</StyledButton>

        <StyledButton cssType="main_02"> Main 2번 버튼</StyledButton>

        <StyledButton cssType="sub_01"> Sub 1번 버튼 </StyledButton>

        <StyledButton cssType="sub_02"> Sub 2번 버튼 </StyledButton>

        <StyledButton cssType="sub_03"> Sub 3번 버튼 </StyledButton>
      </div>
      <div>
        <p> 2. CheckBox</p>
        <StyledCheckbox style={{ margin: 10 }}> 체크박스</StyledCheckbox>

        <StyledCheckbox style={{ margin: 10 }} disabled>
          Disabled
        </StyledCheckbox>

        <StyledCheckbox style={{ margin: 10 }} defaultChecked>
          defaultChecked
        </StyledCheckbox>
      </div>
      <div>
        <p> 3. SelectBox</p>
        <StyledDropDownList
          style={{ margin: 10, width: 100 }}
          data={categories}
        />

        <StyledDropDownList
          style={{ margin: 10, width: 100 }}
          data={categories}
          defaultValue="Pizza"
          disabled
        />
      </div>
      <div>
        <p> 4. Input</p>
        <StyledInput
          style={{ margin: 10, width: 100 }}
          placeholder="입력하세요"
        />
        <StyledInput
          style={{ margin: 10, width: 100 }}
          placeholder="disabled"
          disabled
        />
        <CustomInput placeholder="password" />
        <StyledInput
          name="email"
          type="email"
          style={{ margin: 10, width: 500 }}
          label="Email address (EmailType, Input label and required=True)"
          required
        />
      </div>
    </div>
  );
}

export default CommonSample;
