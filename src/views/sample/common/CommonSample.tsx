import StyledButton from "@/components/kendo/common/StyledButton.tsx";
import StyledCheckbox from "@/components/kendo/common/StyledCheckbox.tsx";
import StyledDropDownList from "@/components/kendo/common/StyledDropDownList.tsx";
import StyledInput from "@/components/kendo/common/StyledInput.tsx";

function CommonSample() {
  const categories = ["Pizza", "Burger", "Pasta", "Burrito"];

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
        <StyledInput
          style={{ margin: 10, width: 100 }}
          placeholder="password"
          type="password"
          value="123123"
        />
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
