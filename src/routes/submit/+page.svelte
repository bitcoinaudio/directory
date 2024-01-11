<script>
	import logo from '$lib/images/ba-logo.svg'
</script>
<svelte:head>
	<title>Submit</title>
	<meta name="description" content="How to submit" />
</svelte:head>

<div class="text-column">
	<h1>How to get on</h1>

	<div id="details-content" class="container">
		<div class="row">
			<div class="col-12">
					<h2>BTCAudio Submision Form</h2>
					<img src={logo} alt="logo" style="width:150px;float:right;margin:10px;">
					<p>This form is the first check that your Token/Card needs to pass in the submission process for the Fake Rare Directory.</p>
					<p>If the Token/Card does not pass this form it means you need to make changes to the Token (locked, divisible) or Asset (Image dimesions/ratio) and come back and check on this form again.</p>
					<p>To submit a Token/Card, you will need to have it minted on XCP, ideally using EasyAsset for the .json creation.  If you have questions about minting on XCP please head over to this <a href="https://robotlovecoffee.io/CreatorFW.html" target="_blank">link</a> and follow along the full walkthru document with time-stamped videos.</p>
					<p>NOTE: Unlike the older submission system, images must be part of the Token on XCP before you submit the form below.</p>
	
					<p>Once you have the Token minted, please fill out the form below and submit it. If the Token/Card passes all the checks, it will then get reviewed.</p>
					<p>We use the Telegram and Email provided for moderation and will send Telegram message if Accepted or an auto email if Rejected.</p>
					<p>Please only submit 1 TOKEN at a time for review. If your card is rejected, you can submit another.</p>                
					<p>NOTE: Please don't destroy your FAKEASF until asked to do so. if your submission is accepted, someone will give you further instructions via Telegram on the sacrifice.</p>
					<p>Token Specs:</p>
					<ul>
						<li>All Token supply must be held by the Minting Address</li>
						<li>Image must be 400×560, you can use a larger version but please use same aspect ratio (800x1120, 1600x2240).</li>
						<li>Aspect Ratio: 5 : 7 | Dimensions: 400 × 560 | Mode: portrait</li>
						<li>Keep files under 10MB</li>
						<li>Issuance must be LOCKED</li>
						<li>Token must NOT be DIVISIBLE.</li>
						<li>You must issue at least 21 tokens and no more than 2,100.</li>
						<li>Minting Address must hold all tokens</li>
						<li>No NSFW content please.</li>
					</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-11">
					<hr>
	<form action="https://xcpsub.io/FakeRares" class="standard-form fv-form fv-form-bootstrap" enctype="multipart/form-data" id="RegistrationForm" method="post" novalidate="novalidate"><button type="submit" class="fv-hidden-submit" style="display: none; width: 0px; height: 0px;"></button>                    <b><span class="field-validation-valid help-block" data-valmsg-for="" data-valmsg-replace="true"></span></b>
	
	<div class="form-group">
		<label for="Token">XCP Token Name<span class="mandatory">*</span></label>
		<input class="form-control" data-val="true" data-val-length="Token is too long" data-val-length-max="256" data-val-required="Token required" id="Token" name="Token" type="text" value="" data-fv-field="Token">
		<span class="field-validation-valid help-block" data-valmsg-for="Token" data-valmsg-replace="true"></span>
	
	<small class="help-block" data-fv-validator="notEmpty" data-fv-for="Token" data-fv-result="NOT_VALIDATED" style="display: none;">Required</small></div>
	<div class="form-group">
		<label for="ArtistName">Artist<span class="mandatory">*</span></label>
		<input class="form-control" data-val="true" data-val-length="Name is too long" data-val-length-max="50" data-val-required="Artist is required" id="ArtistName" name="ArtistName" type="text" value="" data-fv-field="ArtistName">
		<span class="field-validation-valid help-block" data-valmsg-for="ArtistName" data-valmsg-replace="true"></span>
	
	<small class="help-block" data-fv-validator="notEmpty" data-fv-for="ArtistName" data-fv-result="NOT_VALIDATED" style="display: none;">Required</small></div>
	<div class="form-group">
		<label for="Email">Email<span class="mandatory">*</span></label>
		<input class="form-control" data-val="true" data-val-length="Email is too long" data-val-length-max="50" data-val-required="Email is required" id="Email" name="Email" type="text" value="" data-fv-field="Email">
		<span class="field-validation-valid help-block" data-valmsg-for="Email" data-valmsg-replace="true"></span>
	
	<small class="help-block" data-fv-validator="notEmpty" data-fv-for="Email" data-fv-result="NOT_VALIDATED" style="display: none;">Required</small></div>
	<div class="form-group">
		<label for="Telegram">Telegram<span class="mandatory">*</span></label>
		<input class="form-control" data-val="true" data-val-length="Telegram is too long" data-val-length-max="50" data-val-required="Telegram is required" id="Telegram" name="Telegram" type="text" value="" data-fv-field="Telegram">
		<span class="field-validation-valid help-block" data-valmsg-for="Telegram" data-valmsg-replace="true"></span>
	
	<small class="help-block" data-fv-validator="notEmpty" data-fv-for="Telegram" data-fv-result="NOT_VALIDATED" style="display: none;">Required</small></div>                    <p>Upload Static Image or .gif</p>
						<div class="form-group form-file">
							<input name="UserImage" id="UserImage" type="file" value="" class="" required="" data-fv-field="UserImage">
						<small class="help-block" data-fv-validator="notEmpty" data-fv-for="UserImage" data-fv-result="NOT_VALIDATED" style="display: none;">Image is required</small><small class="help-block" data-fv-validator="file" data-fv-for="UserImage" data-fv-result="NOT_VALIDATED" style="display: none;">The selected file is not valid</small></div>
						<hr>
						<p><b>Does your card have physical(s) associated with it?</b></p>
						<div class="form-group form-checkbox">
							<label>
								<input class="check-box" data-val="true" data-val-required="The Physical field is required." id="Physical" name="Physical" type="checkbox" value="true"><input name="Physical" type="hidden" value="false">
								<span>Yes, there is a physical piece</span>
							</label>
							<span class="field-validation-valid help-block" data-valmsg-for="" data-valmsg-replace="true"></span>
						</div>
						<p>Only use the note field below if you need to tell the Fake Scientists specific details ie. if your piece is intended for an upcoming gallery, part of a mini-series, has a gamified distribution mechanism, etc. </p>
	
	<div class="form-group">
	<label for="ArtistNote">Artist Note</label>
	<textarea class="form-control" cols="20" id="ArtistNote" name="ArtistNote" rows="2" style="height:100px;"></textarea>
	<span class="field-validation-valid help-block" data-valmsg-for="ArtistNote" data-valmsg-replace="true"></span>
	</div>                    <hr>
						<div class="form-footer">
							<button type="submit" class="button" id="btnSubmit" data-loading-text="Submitting...">Submit</button>
							<p>Uploading may take a little while based on the size of your image.</p>
							<br>
	
						</div>
	</form>        </div>
		</div>
	</div>
</div>
